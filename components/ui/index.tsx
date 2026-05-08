// Reusable UI components for Contigo platform
import { motion, HTMLMotionProps } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

// Card Component
interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = true, ...props }: CardProps) {
  return (
    <motion.div
      className={`backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 ${className}`}
      whileHover={hover ? { scale: 1.02, boxShadow: '0px 20px 40px rgba(249, 123, 79, 0.15)' } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Button Component
interface ButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: LucideIcon;
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  icon: Icon,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 justify-center';
  const variantClasses = {
    primary: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg',
    secondary: 'bg-white/10 border border-white/20 text-white hover:bg-white/20',
    ghost: 'text-white hover:bg-white/10',
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </motion.button>
  );
}

// Badge Component
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

export function Badge({ children, variant = 'info', className = '' }: BadgeProps) {
  const variantClasses = {
    success: 'bg-green-500/20 text-green-400 border-green-400/30',
    warning: 'bg-amber-500/20 text-amber-400 border-amber-400/30',
    danger: 'bg-red-500/20 text-red-400 border-red-400/30',
    info: 'bg-blue-500/20 text-blue-400 border-blue-400/30',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}

// KPI Card Component
interface KPICardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  color?: string;
}

export function KPICard({ label, value, icon: Icon, trend, color = 'from-blue-500/20 to-blue-600/20' }: KPICardProps) {
  return (
    <motion.div
      className={`backdrop-blur-md bg-gradient-to-br ${color} border border-white/20 rounded-2xl p-6 hover:border-white/30 transition-all cursor-pointer group`}
      whileHover={{ scale: 1.02, boxShadow: '0px 20px 40px rgba(249, 123, 79, 0.15)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="flex items-start justify-between mb-4">
        <motion.div
          className="p-3 rounded-xl bg-white/10 group-hover:bg-white/20 transition-all"
          whileHover={{ rotate: 10, scale: 1.1 }}
        >
          <Icon className="w-6 h-6 text-orange-400" />
        </motion.div>
        {trend && (
          <span className="text-xs font-semibold text-green-400 bg-green-500/20 px-2 py-1 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <p className="text-white/70 text-sm mb-2">{label}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </motion.div>
  );
}
