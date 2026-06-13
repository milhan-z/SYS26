import { Hud } from "@/components/Hud";
import { PageNav } from "@/components/PageNav";
import { Hero } from "@/components/sections/Hero";
import { Details } from "@/components/sections/Details";
import { Venue } from "@/components/sections/Venue";
import { Memories } from "@/components/sections/Memories";
import { Rsvp } from "@/components/sections/Rsvp";

export default function InvitationPage() {
  return (
    <>
      <Hud />
      <main>
        <Hero />
        <Details />
        <Venue />
        <Memories />
        <Rsvp />
      </main>
      <PageNav />
    </>
  );
}
