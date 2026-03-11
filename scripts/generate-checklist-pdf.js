/**
 * Generates the Crypto Security Checklist PDF lead magnet.
 * Uses only Node.js built-ins — outputs to public/crypto-security-checklist.pdf
 *
 * Run: node scripts/generate-checklist-pdf.js
 *
 * This generates a minimal, spec-compliant PDF without any dependencies.
 */

const fs = require("fs");
const path = require("path");

const OUTPUT = path.join(__dirname, "..", "public", "crypto-security-checklist.pdf");

// ── Colors ──
const GOLD = "0.96 0.65 0.14";     // #F5A623
const DARK_BG = "0.043 0.067 0.129"; // #0B1121
const SURFACE = "0.067 0.106 0.188"; // #111B30
const WHITE = "0.96 0.94 0.91";      // #F5F0E8
const GRAY = "0.58 0.64 0.72";       // #94A3B8
const TEAL = "0.18 0.83 0.75";       // #2DD4BF
const RED = "0.94 0.27 0.27";        // #EF4444

// ── PDF Builder ──
class PDFBuilder {
  constructor() {
    this.objects = [];
    this.pages = [];
    this.currentPage = null;
    this.y = 0;
  }

  addObject(content) {
    const id = this.objects.length + 1;
    this.objects.push(content);
    return id;
  }

  newPage() {
    this.currentPage = [];
    this.pages.push(this.currentPage);
    this.y = 770;
  }

  // Low-level text
  text(str, x, y, size, color, font) {
    const escaped = str
      .replace(/\\/g, "\\\\")
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)")
      .replace(/[\u2013\u2014]/g, "-")
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/\u2022/g, "\\267")
      .replace(/[^\x00-\xFF]/g, "?");
    const fontRef = font === "bold" ? "/F2" : "/F1";
    this.currentPage.push(
      `BT ${color} rg ${fontRef} ${size} Tf ${x} ${y} Td (${escaped}) Tj ET`
    );
  }

  rect(x, y, w, h, color, fill = true) {
    const op = fill ? "f" : "S";
    this.currentPage.push(`${color} ${fill ? "rg" : "RG"} ${x} ${y} ${w} ${h} re ${op}`);
  }

  line(x1, y1, x2, y2, color, width = 0.5) {
    this.currentPage.push(
      `${color} RG ${width} w ${x1} ${y1} m ${x2} ${y2} l S`
    );
  }

  // High-level helpers
  heading(str, size = 18, color = WHITE) {
    if (this.y < 80) this.newPage();
    this.text(str, 50, this.y, size, color, "bold");
    this.y -= size + 8;
  }

  paragraph(str, color = GRAY, size = 10) {
    if (this.y < 60) this.newPage();
    // Simple word-wrap at ~85 chars
    const maxWidth = 85;
    const words = str.split(" ");
    let line = "";
    for (const word of words) {
      if ((line + " " + word).length > maxWidth && line.length > 0) {
        this.text(line.trim(), 50, this.y, size, color, "normal");
        this.y -= size + 4;
        if (this.y < 60) this.newPage();
        line = word;
      } else {
        line += " " + word;
      }
    }
    if (line.trim()) {
      this.text(line.trim(), 50, this.y, size, color, "normal");
      this.y -= size + 4;
    }
    this.y -= 4;
  }

  checkItem(str) {
    if (this.y < 60) this.newPage();
    // Checkbox outline
    this.rect(56, this.y - 1, 10, 10, GRAY, false);
    this.text(str, 74, this.y, 10, WHITE, "normal");
    this.y -= 20;
  }

  sectionHeader(str) {
    if (this.y < 100) this.newPage();
    this.y -= 8;
    this.rect(50, this.y - 4, 495, 24, SURFACE);
    this.text(str, 58, this.y, 11, GOLD, "bold");
    this.y -= 32;
  }

  spacer(h = 10) {
    this.y -= h;
  }

  build() {
    // ── Build page objects ──
    // Fonts
    const font1Id = this.addObject(
      "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"
    );
    const font2Id = this.addObject(
      "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>"
    );

    const resourcesDict = `/Font << /F1 ${font1Id} 0 R /F2 ${font2Id} 0 R >>`;

    const pageIds = [];
    for (const pageContent of this.pages) {
      // Full-page dark background + content
      const stream = [
        // Background
        `${DARK_BG} rg 0 0 612 792 re f`,
        ...pageContent,
      ].join("\n");

      const streamId = this.addObject(
        `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`
      );

      const pageId = this.addObject("PAGE_PLACEHOLDER");
      pageIds.push(pageId);
      this.objects[pageId - 1] =
        `<< /Type /Page /Parent PAGES_REF /MediaBox [0 0 612 792] ` +
        `/Resources << ${resourcesDict} >> /Contents ${streamId} 0 R >>`;
    }

    // Pages object
    const pagesId = this.addObject(
      `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`
    );

    // Update parent refs
    for (const pid of pageIds) {
      this.objects[pid - 1] = this.objects[pid - 1].replace(
        "PAGES_REF",
        `${pagesId} 0 R`
      );
    }

    // Catalog
    const catalogId = this.addObject(
      `<< /Type /Catalog /Pages ${pagesId} 0 R >>`
    );

    // ── Serialize ──
    let pdf = "%PDF-1.4\n";
    const offsets = [];

    for (let i = 0; i < this.objects.length; i++) {
      offsets.push(pdf.length);
      pdf += `${i + 1} 0 obj\n${this.objects[i]}\nendobj\n`;
    }

    const xrefOffset = pdf.length;
    pdf += `xref\n0 ${this.objects.length + 1}\n`;
    pdf += "0000000000 65535 f \n";
    for (const offset of offsets) {
      pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
    }

    pdf += `trailer\n<< /Size ${this.objects.length + 1} /Root ${catalogId} 0 R >>\n`;
    pdf += `startxref\n${xrefOffset}\n%%EOF\n`;

    return pdf;
  }
}

// ── Generate ──
function generate() {
  const pdf = new PDFBuilder();

  // ═══ PAGE 1: Cover ═══
  pdf.newPage();

  // Gold accent bar at top
  pdf.rect(0, 750, 612, 42, GOLD);
  pdf.text("FREEDOMPROTOCOL.IO", 50, 762, 10, DARK_BG, "bold");
  pdf.text("SECURITY INTELLIGENCE", 400, 762, 10, DARK_BG, "normal");

  pdf.y = 620;
  pdf.text("THE CRYPTO", 50, pdf.y, 36, WHITE, "bold");
  pdf.y -= 44;
  pdf.text("SECURITY", 50, pdf.y, 36, GOLD, "bold");
  pdf.y -= 44;
  pdf.text("CHECKLIST", 50, pdf.y, 36, WHITE, "bold");

  pdf.y -= 40;
  pdf.line(50, pdf.y, 200, pdf.y, GOLD, 2);
  pdf.y -= 30;

  pdf.text("25-Point Audit You Can Run in 30 Minutes", 50, pdf.y, 14, GRAY, "normal");
  pdf.y -= 24;
  pdf.text("Updated March 2026", 50, pdf.y, 10, GRAY, "normal");

  pdf.y -= 60;
  pdf.paragraph(
    "$3.8 billion was stolen from crypto holders in 2025. Most of it was preventable. " +
    "This checklist covers the 25 most critical security controls, organized into 5 categories. " +
    "Run through it in 30 minutes. Fix what fails. Run it again monthly."
  );

  pdf.y -= 20;
  pdf.rect(50, pdf.y - 40, 495, 50, SURFACE);
  pdf.text("YOUR SCORE:        / 25", 70, pdf.y - 22, 16, WHITE, "bold");
  pdf.text("DATE:", 350, pdf.y - 22, 12, GRAY, "normal");
  pdf.line(400, pdf.y - 28, 520, pdf.y - 28, GRAY, 0.5);

  // ═══ PAGE 2: Wallet + Account ═══
  pdf.newPage();

  // Header bar
  pdf.rect(0, 750, 612, 42, SURFACE);
  pdf.text("CRYPTO SECURITY CHECKLIST", 50, 762, 9, GOLD, "bold");
  pdf.text("FREEDOMPROTOCOL.IO", 430, 762, 9, GRAY, "normal");

  pdf.y = 730;

  pdf.sectionHeader("WALLET SECURITY  (7 POINTS)");
  pdf.checkItem("Hardware wallet firmware is up to date");
  pdf.checkItem("Seed phrase stored on metal (not paper, not digital)");
  pdf.checkItem("Seed phrase in 2+ separate physical locations");
  pdf.checkItem("Hot wallet holds < 5% of total holdings");
  pdf.checkItem("No unused token approvals (check revoke.cash)");
  pdf.checkItem("Wallet apps downloaded from official sources only");
  pdf.checkItem("Using a dedicated device for crypto transactions");

  pdf.spacer(10);
  pdf.sectionHeader("ACCOUNT SECURITY  (5 POINTS)");
  pdf.checkItem("Unique email for crypto accounts (not personal email)");
  pdf.checkItem("2FA enabled on ALL exchange accounts (hardware key preferred)");
  pdf.checkItem("No SMS-based 2FA (SIM swap vulnerable)");
  pdf.checkItem("Unique strong password per exchange (password manager)");
  pdf.checkItem("Withdrawal address whitelisting enabled");

  pdf.spacer(10);
  pdf.sectionHeader("DEVICE SECURITY  (5 POINTS)");
  pdf.checkItem("Device OS and apps fully updated");
  pdf.checkItem("Full disk encryption enabled");
  pdf.checkItem("Antivirus / anti-malware active and current");
  pdf.checkItem("No browser extensions except verified security tools");
  pdf.checkItem("VPN active when accessing crypto services");

  // ═══ PAGE 3: Network + OpSec + Scoring ═══
  pdf.newPage();

  pdf.rect(0, 750, 612, 42, SURFACE);
  pdf.text("CRYPTO SECURITY CHECKLIST", 50, 762, 9, GOLD, "bold");
  pdf.text("FREEDOMPROTOCOL.IO", 430, 762, 9, GRAY, "normal");

  pdf.y = 730;

  pdf.sectionHeader("NETWORK SECURITY  (4 POINTS)");
  pdf.checkItem("Never access wallets on public WiFi (even with VPN)");
  pdf.checkItem("Home router firmware updated");
  pdf.checkItem("DNS set to encrypted provider (1.1.1.1 or Quad9)");
  pdf.checkItem("Using a no-log VPN for all crypto activity");

  pdf.spacer(10);
  pdf.sectionHeader("OPERATIONAL SECURITY  (4 POINTS)");
  pdf.checkItem("Never publicly discussed exact holdings");
  pdf.checkItem("No screenshots of wallet balances shared");
  pdf.checkItem("Exchange withdrawal confirmations go to secure email");
  pdf.checkItem("Emergency plan documented (if incapacitated)");

  // Scoring section
  pdf.spacer(20);
  pdf.line(50, pdf.y, 545, pdf.y, GOLD, 1);
  pdf.y -= 20;
  pdf.heading("SCORING", 16, GOLD);
  pdf.spacer(4);

  pdf.rect(50, pdf.y - 18, 495, 26, "0.09 0.53 0.46"); // teal bg
  pdf.text("25/25    Protocol-grade security. Maintain it.", 62, pdf.y - 10, 10, WHITE, "bold");
  pdf.y -= 32;

  pdf.rect(50, pdf.y - 18, 495, 26, "0.15 0.25 0.08");
  pdf.text("20-24    Strong. Fix the gaps this week.", 62, pdf.y - 10, 10, WHITE, "bold");
  pdf.y -= 32;

  pdf.rect(50, pdf.y - 18, 495, 26, "0.35 0.25 0.05");
  pdf.text("15-19    Vulnerable. Prioritize hardware wallet + 2FA now.", 62, pdf.y - 10, 10, WHITE, "bold");
  pdf.y -= 32;

  pdf.rect(50, pdf.y - 18, 495, 26, "0.35 0.08 0.08");
  pdf.text("Below 15  Critical risk. Secure your stack TODAY.", 62, pdf.y - 10, 10, WHITE, "bold");
  pdf.y -= 50;

  // Recommended tools
  pdf.heading("RECOMMENDED TOOLS", 14, GOLD);
  pdf.spacer(4);
  pdf.paragraph("Hardware Wallet: Ledger Nano X or Trezor Model T", WHITE, 10);
  pdf.paragraph("VPN: ProtonVPN (free) or Mullvad ($5/mo)", WHITE, 10);
  pdf.paragraph("Password Manager: Bitwarden (free)", WHITE, 10);
  pdf.paragraph("2FA: YubiKey 5 hardware security key ($50)", WHITE, 10);
  pdf.paragraph("Email: ProtonMail + SimpleLogin aliases", WHITE, 10);

  pdf.spacer(20);
  pdf.line(50, pdf.y, 545, pdf.y, SURFACE, 0.5);
  pdf.y -= 16;
  pdf.paragraph(
    "Run this audit monthly. Your security is only as strong as your weakest link.",
    GRAY,
    9
  );
  pdf.paragraph(
    "More guides, tools, and weekly briefings at freedomprotocol.io",
    GOLD,
    9
  );

  // ── Write file ──
  const dir = path.dirname(OUTPUT);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(OUTPUT, pdf.build());
  console.log(`PDF generated: ${OUTPUT}`);
  console.log(`Pages: ${pdf.pages.length}`);
  const stat = fs.statSync(OUTPUT);
  console.log(`Size: ${(stat.size / 1024).toFixed(1)} KB`);
}

generate();
