import Image from "next/image";
import { members } from "@/lib/members";

export default function Members() {
  return (
    <section id="band" className="bg-base py-24 px-4">
      <div className="max-w-5xl mx-auto">

        <h2 className="text-3xl font-black tracking-widest uppercase text-fg mb-2">
          De band
        </h2>
        <p className="text-fg-subtle mb-12">Maak kennis met de mensen achter het geluid.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member) => (
            <div key={member.id} className="flex flex-col gap-4">
              <div className="relative aspect-square bg-subtle rounded overflow-hidden">
                <Image src={member.photo} alt={member.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover" />
              </div>
              <div>
                <p className="font-bold text-fg">{member.name}</p>
                <p className="text-xs font-mono tracking-widest uppercase text-accent mb-2">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
