import connectDB from "../lib/db";
import AdminUser from "../models/AdminUser";
import SignatureMap from "../models/SignatureMap";
import bcrypt from "bcryptjs";

async function seed() {
  try {
    await connectDB();
    console.log("Connected to database");

    // Create admin user
    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "changeMeNow!";

    const existingAdmin = await AdminUser.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash(adminPassword, 10);
      await AdminUser.create({
        email: adminEmail,
        passwordHash,
        role: "admin",
      });
      console.log(`Admin user created: ${adminEmail}`);
    } else {
      console.log("Admin user already exists");
    }

    // Create signature maps
    const signatures = [
      {
        regionCode: "HYD-01",
        rtaName: "Hyderabad Regional Transport Authority",
        signatureUrl: "/assets/signatures/rta/hyd-01.png",
      },
      {
        regionCode: "KRM-01",
        rtaName: "Karimnagar Regional Transport Authority",
        signatureUrl: "/assets/signatures/rta/krm-01.png",
      },
    ];

    for (const sig of signatures) {
      const existing = await SignatureMap.findOne({ regionCode: sig.regionCode });
      if (!existing) {
        await SignatureMap.create(sig);
        console.log(`Signature map created: ${sig.regionCode}`);
      } else {
        console.log(`Signature map already exists: ${sig.regionCode}`);
      }
    }

    console.log("Seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seed();









