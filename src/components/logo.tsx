import Link from 'next/link';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 text-foreground ${className}`} aria-label="JusticeBot Canada Home">
       <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-7 w-7 text-primary"
        aria-hidden="true"
      >
        <path d="M15.864 3.322c.164-.287.164-.657 0-.944l-.239-.414c-.165-.287-.478-.464-.811-.464H9.186c-.333 0-.646.177-.81.464l-.24.414c-.164.287-.164.657 0 .944l3.414 5.914a.5.5 0 010 .5L8.136 15.65a.5.5 0 00-.216.434V18.25c0 .414.336.75.75.75h5.66c.414 0 .75-.336.75-.75v-2.166a.5.5 0 00-.216-.434l-3.415-5.914a.5.5 0 010-.5l3.415-5.914zM12 11.268l1.838 3.184a1.5 1.5 0 01.325 1.302V18.25h-4.326v-2.5a1.5 1.5 0 01.325-1.302L12 11.268zM8.25 20c0 .414.336.75.75.75h6c.414 0 .75-.336.75-.75v-1H8.25v1z" />
        <path d="M6.31 8.878l-3.415 5.914a.5.5 0 00.216.868h1.439c.333 0 .646-.177.81-.464l2.16-3.742a.5.5 0 00-.433-.75H6.31zm11.38 0h-.78a.5.5 0 00-.433.75l2.16 3.742c.164.287.477.464.81.464h1.439a.5.5 0 00.216-.868l-3.415-5.914z"/>
      </svg>
      <span className="text-xl font-bold tracking-tight">JusticeBot</span>
    </Link>
  );
}
