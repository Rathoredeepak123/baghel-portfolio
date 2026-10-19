export const profile = {
  name: "Shreyansh Baghel",
  email: "baghelshreyansh7@gmail.com",
  phone: "+91 9667441152",
  whatsapp: "https://wa.me/919667441152",
  linkedin: "https://www.linkedin.com/in/shreyansh-baghel-707938278",
  x: "https://x.com/DEdit10798",
  headline: "Creative visuals. Global connections.",
  about: "I explore the intersection of video editing, motion design, modern web technologies and global client outreach. I connect with clients through Instagram, LinkedIn and professional websites, and I am currently pursuing the German language."
};
export const visuals = {
  hero: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1800&q=85",
  showreel: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1600&q=85",
  edit: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1400&q=85",
  motion: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1400&q=85",
  web: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=85",
  outreach: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=85",
  alliance: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85"
};
export type Category = "Video Editing" | "Motion Graphics" | "Web" | "Outreach";
export type Project = {id:string;title:string;category:Category;eyebrow:string;description:string;details:string[];image:string;status:string};
export const projects: Project[] = [
  {id:"video",title:"Visual Storytelling",category:"Video Editing",eyebrow:"Creative discipline",description:"Editing workflows for compelling visual narratives.",details:["Adobe Premiere Pro and DaVinci Resolve are part of Shreyansh's toolkit.","A client-approved video case study and final deliverables can be added here.","This is a capability showcase, not a claim of a completed commissioned project."],image:visuals.edit,status:"Capability showcase"},
  {id:"motion",title:"Motion & Visual Effects",category:"Motion Graphics",eyebrow:"Creative discipline",description:"Motion-led visuals with Adobe After Effects.",details:["Adobe After Effects for motion graphics and visual effects.","Replace the illustrative image with a real animation or before-and-after breakdown.","No unverified performance metrics or client testimonials are shown."],image:visuals.motion,status:"Capability showcase"},
  {id:"web",title:"Interactive Web Experiences",category:"Web",eyebrow:"Technology focus",description:"Modern front-end work with JavaScript and React.",details:["JavaScript and React are part of the technical skill set.","Add a live project URL, screenshots and a technology breakdown when approved.","This is a skills showcase rather than a fabricated client project."],image:visuals.web,status:"Technology focus"},
  {id:"outreach",title:"Global Client Outreach",category:"Outreach",eyebrow:"Professional activity",description:"Connecting with potential clients worldwide through digital platforms.",details:["Outreach through Instagram, LinkedIn and websites.","Focused on building relationships across markets.","Results and client identities are intentionally not invented."],image:visuals.outreach,status:"Ongoing"}
];
export const skills = [
  {name:"Adobe Premiere Pro",group:"Video editing",description:"Editing and post-production workflows.",index:"01"},
  {name:"Adobe After Effects",group:"Motion graphics",description:"Motion design and visual effects.",index:"02"},
  {name:"DaVinci Resolve",group:"Video editing",description:"Video editing and color workflows.",index:"03"},
  {name:"JavaScript",group:"Web development",description:"Interactive web experiences.",index:"04"},
  {name:"React",group:"Web development",description:"Component-based user interfaces.",index:"05"}
];