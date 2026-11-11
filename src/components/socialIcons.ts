import { FaGithub, FaLinkedinIn, FaSnapchat, FaWhatsapp, FaXTwitter, FaYoutube } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { socials, type SocialId } from "@/content/shared";

export const socialIcons: Record<SocialId, IconType> = {
  whatsapp: FaWhatsapp,
  linkedin: FaLinkedinIn,
  github: FaGithub,
  snapchat: FaSnapchat,
  x: FaXTwitter,
  youtube: FaYoutube,
};

/** Only networks that have a link. */
export const activeSocials = socials.filter((s) => s.href);
