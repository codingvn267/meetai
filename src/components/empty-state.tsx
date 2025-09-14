import Image from "next/image";

interface Props {
  title: string;
  description: string;
  image?: string;
}

export const EmptyState = ({ 
  title, 
  description,
  image="/empty.svg" 
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center rounded-2xl border border-border bg-muted/30 shadow-sm">
      <div className="mb-6">
        <Image
          src={image}
          alt="Empty"
          width={0}
          height={0}
          sizes="100vw"
          className="w-40 h-auto md:w-56 opacity-80"
        />
      </div>

      <h6 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">{title}</h6>
      <p className="mt-2 text-sm text-muted-foreground max-w-md">{description}</p>
    </div>
  );
};


