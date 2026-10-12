import { cn, initials } from "@/lib/utils";

const SIZE_CLASS = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-base",
  xl: "h-20 w-20 text-xl"
} as const;

export function Avatar({
  name,
  src,
  size = "md",
  className
}: {
  name: string;
  src?: string | null;
  size?: keyof typeof SIZE_CLASS;
  className?: string;
}) {
  return (
    <div className={cn("avatar", SIZE_CLASS[size], className)}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="h-full w-full object-cover" />
      ) : (
        initials(name)
      )}
    </div>
  );
}
