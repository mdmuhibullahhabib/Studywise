import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  const [, , email, password, name] = process.argv;

  if (!email || !password) {
    console.error('Usage: npx tsx prisma/create-admin.ts "you@example.com" "yourPassword" "Your Name"');
    process.exit(1);
  }
  if (password.length < 8) {
    console.error("Password must be at least 8 characters.");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await db.user.upsert({
    where: { email },
    update: { passwordHash, role: "ADMIN", name: name ?? undefined },
    create: { email, passwordHash, role: "ADMIN", name: name ?? "Admin" }
  });

  console.log(`Admin ready: ${admin.email} (id: ${admin.id})`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
