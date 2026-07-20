import Link from 'next/link';
import { cn } from '@/lib/utils';

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-dark">{title}</h1>
        {description && <p className="text-dark/50 text-sm mt-1">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({
  className,
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return <div style={style} className={cn('bg-white rounded-xl border border-gray-200', className)}>{children}</div>;
}

export function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-dark/70 mb-1.5">
      {children}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        'w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-dark focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500 disabled:bg-gray-50 disabled:text-dark/40',
        props.className
      )}
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        'w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-dark focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500 resize-none',
        props.className
      )}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        'w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-dark bg-white focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500',
        props.className
      )}
    />
  );
}

export function Checkbox({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex items-center gap-2 text-sm text-dark/70 cursor-pointer select-none">
      <input type="checkbox" {...props} className="w-4 h-4 rounded border-gray-300 text-gold-500 focus:ring-gold-500/40" />
      {label}
    </label>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

export function Button({
  variant = 'primary',
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' }) {
  const styles = {
    primary: 'bg-gold-500 hover:bg-gold-600 text-dark',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-dark',
    danger: 'bg-red-50 hover:bg-red-100 text-red-600',
  };
  return (
    <button
      {...props}
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
        styles[variant],
        className
      )}
    />
  );
}

export function LinkButton({
  href,
  variant = 'primary',
  className,
  children,
}: {
  href: string;
  variant?: 'primary' | 'secondary';
  className?: string;
  children: React.ReactNode;
}) {
  const styles = {
    primary: 'bg-gold-500 hover:bg-gold-600 text-dark',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-dark',
  };
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors',
        styles[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}

export function EmptyState({ message }: { message: string }) {
  return <p className="p-8 text-center text-sm text-dark/40">{message}</p>;
}
