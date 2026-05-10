'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface LogoProps {
  href?: string;
  showWordmark?: boolean;
  size?: number;
  className?: string;
}

export default function Logo({
  href = '/',
  showWordmark = false,
  size = 40,
  className = '',
}: LogoProps) {
  const content = (
    <motion.div
      className={`flex items-center gap-2 ${className}`}
      whileHover={{ scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 400, damping: 12 }}
    >
      <Image
        src="/logo.png"
        alt="Contigo logo"
        width={size}
        height={size}
        priority
        className="object-contain drop-shadow-lg"
      />
      {showWordmark && (
        <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
          Contigo
        </span>
      )}
    </motion.div>
  );

  if (!href) return content;
  return (
    <Link href={href} aria-label="Contigo home">
      {content}
    </Link>
  );
}
