"use client";

import * as React from "react";
import Link from "next/link";

interface Article {
  title: string;
  href: string;
}

interface Section {
  title: string;
  articles: Article[];
  totalArticles: number;
  seeAllHref?: string;
}

const sections: Section[] = [
  {
    title: "Account",
    totalArticles: 15,
    articles: [
      { title: "How to register a Nothing account?", href: "#" },
      { title: "What is a third-party account?", href: "#" },
      { title: "How many Nothing accounts can be registered with one email address?", href: "#" },
      { title: "Can I merge two independent accounts registered via a third party and email?", href: "#" },
      { title: "How do I log in to my Nothing account?", href: "#" },
      { title: "Why does the account show 'abnormal login'?", href: "#" },
    ],
  },
  {
    title: "App function issue",
    totalArticles: 0,
    articles: [
      { title: "Why can't I pair CMF earbuds to my iPhone after reset?", href: "#" },
      { title: "Why can't I use the Nothing X app to connect to Ear (open) while on a call with an iOS device?", href: "#" },
      { title: "Why can't I use the Nothing X app to connect to my Nothing Ear while on a call with aan ios device?", href: "#" },
      { title: "Why can't I pair my earbuds to my iPhone after the reset?", href: "#" },
      { title: "What languages does the Nothing X app support?", href: "#" },
      { title: "The App stopped working, what should I do?", href: "#" },
    ],
  },
  {
    title: "Button/Gesture control issue",
    totalArticles: 11,
    articles: [
      { title: "Why is the Smart Dial on the charging case unresponsive when I use it?", href: "#" },
      { title: "Why can't I switch to the previous or next music track when using the gesture control feature of my Earbuds?", href: "#" },
      {
        title: "Why can't I adjust the volume via gestures even though I have set up the gesture control for volume adjustment on my Earbuds?",
        href: "#",
      },
      { title: "Why can't I switch to the previous or next music track using the Roller button on CMF Headphone Pro?", href: "#" },
      { title: "Why can't I adjust the volume using gestures after enabling the setting?", href: "#" },
      { title: "Why can't I use gesture controls on my Nothing Ear (3) to switch to the previous or next track?", href: "#" },
    ],
  },
  {
    title: "Application issue",
    totalArticles: 14,
    articles: [
      { title: "What is the difference between the Standard transcription model and the Pro transcription model?", href: "#" },
      { title: "Why does my phone get warm or occasionally crash when using the Nothing X Standard transcription model?", href: "#" },
      { title: "Why does the other party hear a voice prompt when call recording starts? Can I turn it off?", href: "#" },
      { title: "Why do I need to sign in my Nothing X account to access my recordings?", href: "#" },
      { title: "Why can't I use the Nothing X App to connect my Earbuds while on a call with my iOS device?", href: "#" },
      { title: "Why can't I connect CMF Headphone Pro to the app during a call on iOS devices?", href: "#" },
      { title: "Why does the App frequently disconnect from the Watch?", href: "#" },
    ],
  },
  {
    title: "Application",
    totalArticles: 28,
    articles: [
      { title: "Why can't I connect to the Nothing X app during a call on iOS?", href: "#" },
      { title: "My screen glitched while on Google Maps. What can I do?", href: "#" },
      { title: "I can't download apps. What can I do?", href: "#" },
      { title: "When I send text messages while in a gaming app, the message doesn't send in the background. What can I do?", href: "#" },
      { title: "I can't send voice messages in a game. What can I do?", href: "#" },
      { title: "How do I hide app icons on Phone?", href: "#" },
    ],
  },
  {
    title: "Battery issue",
    totalArticles: 9,
    articles: [
      { title: "The Earbuds run out of power quickly.", href: "#" },
      { title: "The Earbuds run out of power quickly.", href: "#" },
      { title: "Why is is the battery of CMF Headphone Pro draining so quickly?", href: "#" },
      { title: "Why is the battery draining so quickly?", href: "#" },
      { title: "Why is my headphones battery draining quickly?", href: "#" },
      { title: "Why is the battery draining so quickly?", href: "#" },
    ],
  },
  {
    title: "Bluetooth connection issue",
    totalArticles: 30,
    articles: [
      { title: "Why can't my device detect my Earbuds while they are in pairing mode?", href: "#" },
      {
        title:
          "Why doesn't my Earbuds reconnect automatically when the distance to devices like a mobile phone is shortened again after being moved away?",
        href: "#",
      },
      { title: "Why isn't the Earbuds actively and automatically connecting/reconnecting to my device?", href: "#" },
      { title: "Why did I pair two devices via dual connection, but only one of them reconnected after I went out and came back?", href: "#" },
      { title: "Why does the charging case often fail to reconnect to the phone when it is opened while the case has low battery?", href: "#" },
      { title: "Why can't my Nothing X App on iPhone pair with my Earbuds after the Earbuds have been restored to factory settings?", href: "#" },
    ],
  },
  {
    title: "Calling & Network issue",
    totalArticles: 12,
    articles: [
      { title: "The Wi-Fi hotspot does not turn on. What can I do?", href: "#" },
      { title: "The data network isn't working. What can I do?", href: "#" },
      { title: "There are network issues when I download or update a game. What can I do?", href: "#" },
      { title: "How do I turn on the call recording function?", href: "#" },
      { title: "The network or download speed is very slow. What can I do?", href: "#" },
      { title: "The line is breaking during a phone call. What can I do?", href: "#" },
    ],
  },
  {
    title: "Camera",
    totalArticles: 0,
    articles: [
      { title: "My camera is slow to open. What can I do?", href: "#" },
      { title: "My photos won't save. What can I do?", href: "#" },
      { title: "My camera is slow to focus when taking photos. What can I do?", href: "#" },
      { title: "The phone freezes when taking pictures. What can I do?", href: "#" },
    ],
  },
  {
    title: "Charging issue",
    totalArticles: 30,
    articles: [
      { title: "The Earbuds cannot be fully charged.", href: "#" },
      { title: "The earbud case is not charging.", href: "#" },
      { title: "The Earbuds are not charging.", href: "#" },
      { title: "The Earbuds cannot be fully charged.", href: "#" },
      { title: "The earbud case is not charging.", href: "#" },
      { title: "The Earbuds are not charging.", href: "#" },
    ],
  },
  {
    title: "Connectivity",
    totalArticles: 7,
    articles: [
      { title: "Why is my web browser slow?", href: "#" },
      { title: "My game keeps disconnecting. What can I do?", href: "#" },
      { title: "My phone won't connect to a computer. What can I do?", href: "#" },
      { title: "The location toggle won't turn on. What can I do?", href: "#" },
      { title: "The WiFi toggle is unresponsive. What can I do?", href: "#" },
      { title: "The WiFi won't connect automatically. What can I do?", href: "#" },
    ],
  },
  {
    title: "Function issue",
    totalArticles: 21,
    articles: [
      { title: "Why do my headphones automatically turn off when not in use?", href: "#" },
      { title: "Why doesn't wear detection work on my headphones?", href: "#" },
      { title: "Why can't I use the AI assistant on Nothing headphone (a)?", href: "#" },
      { title: "Why is the vibration sensation of my watch too weak?", href: "#" },
      { title: "Why doesn't my watch ring for incoming calls?", href: "#" },
      {
        title:
          "Why does the audio not get recognised when I plug in the Type-C audio cable while the headphones are powered off and then turn them on?",
        href: "#",
      },
    ],
  },
  {
    title: "Power/Booting/Crash",
    totalArticles: 10,
    articles: [
      { title: "How do I force restart my Nothing Phone?", href: "#" },
      { title: "My phone freezes or crashes. What can I do?", href: "#" },
      { title: "What should I do if my phone unexpectedly restarts or powers off automatically?", href: "#" },
      { title: "How to enter and exit Recovery Mode?", href: "#" },
      { title: "My phone won't power on. What can I do?", href: "#" },
      { title: "My phone keeps restarting. What can I do?", href: "#" },
    ],
  },
  {
    title: "Mic issue",
    totalArticles: 0,
    articles: [
      { title: "What should I do if the Nothing Ear series fails to record with the mic in social apps on iOS?", href: "#" },
      { title: "What should I do if the microphone is unresponsive?", href: "#" },
    ],
  },
  {
    title: "Power & Charging",
    totalArticles: 0,
    articles: [
      { title: "My phone will not charge. What can I do?", href: "#" },
      { title: "My phone is charging very slowly or not charging to 100%. What can I do?", href: "#" },
      { title: "My phone is discharging very quickly. What can I do?", href: "#" },
      { title: "My phone is very hot while charging. What can I do?", href: "#" },
      { title: "The battery percentage is not increasing when charging. What can I do?", href: "#" },
      { title: "My phone is heating up. What can I do?", href: "#" },
      { title: "The charger gets very warm when connected to power. Is that normal? What can I do?", href: "#" },
    ],
  },
  {
    title: "Screen problem",
    totalArticles: 17,
    articles: [
      { title: "My Phone's screen touches are unresponsive. What can I do?", href: "#" },
      { title: "The screen does not rotate. What can I do?", href: "#" },
      { title: "My phone crashes to boot after a software update. What can I do?", href: "#" },
      { title: "Part of the screen touches are unresponsive. What can I do?", href: "#" },
      { title: "My phone is slow to turn on. What can I do?", href: "#" },
      { title: "The phone experiences screen burn-in. What can I do?", href: "#" },
    ],
  },
  {
    title: "Sound",
    totalArticles: 0,
    articles: [
      { title: "An app has no sound or low volume. What can I do?", href: "#" },
      { title: "What can I do if the Earbuds volume is low?", href: "#" },
      { title: "Why is there a buzzing, clicking or crackling sound from the earphone?", href: "#" },
      { title: "Why is the volume too low when the earphone is connected to a computer to play audio?", href: "#" },
      { title: "Why is there noise from the microphone when wearing Nothing Ear (3)?", href: "#" },
    ],
  },
  {
    title: "Sound issue",
    totalArticles: 10,
    articles: [
      { title: "What should I do if the mic of the Nothing Ear series fails to record with third-party software on iOS?", href: "#" },
      { title: "Why is the volume so low when I use the headphones?", href: "#" },
      { title: "Why is the sound distorted?", href: "#" },
      { title: "The sound is distorted. What can I do?", href: "#" },
      { title: "Why does the call sound intermittent when using the earphone?", href: "#" },
      { title: "What do I do if one Earbud is louder than the other when in use?", href: "#" },
      { title: "The audio is cut off / breaking?", href: "#" },
    ],
  },
  {
    title: "Others",
    totalArticles: 0,
    articles: [
      { title: "Why can't I access ChatGPT on Nothing Phone (2a)?", href: "#" },
      { title: "Will eSIM be supported by Phone (1) or (2)?", href: "#" },
      { title: "How to clean the Earbuds or charging case?", href: "#" },
      { title: "How to clean the Earbuds or charging case?", href: "#" },
    ],
  },
  {
    title: "Button/Gesture control defects",
    totalArticles: 0,
    articles: [
      { title: "The volume dial cannot control the audio volume?", href: "#" },
      { title: "Why can't I switch to the previous or next song using gesture control?", href: "#" },
      { title: "I have set up 'double pinch' on the earphone for volume control. Why is it unresponsive?", href: "#" },
      { title: "Why can't I switch to the previous or next song using gesture control?", href: "#" },
      { title: "I have set the 'pinch' to turn volume up/down, but it is invalid. What is the reason?", href: "#" },
    ],
  },
  {
    title: "Earphone & Earbuds feature",
    totalArticles: 16,
    articles: [
      { title: "What should I do if the Nothing X app can't connect to Nothing Ear series on iOS during a phone call?", href: "#" },
      { title: "Why can't I use the AI assistant on Nothing Ear (3)?", href: "#" },
      { title: "What can I do if the Earbuds volume is low?", href: "#" },
      { title: "Why does the Earbud case not charge the earbuds properly?", href: "#" },
      { title: "What can I do if the Nothing X app can't connect to Nothing Ear series on iOS during a phone call?", href: "#" },
      { title: "Why does the Earbuds fail to pair or reconnect to the phone when taken out of the charging case?", href: "#" },
    ],
  },
  {
    title: "System & Common issue",
    totalArticles: 0,
    articles: [
      { title: "Why is the screen lagging/slow/unresponsive on Phone (2a)?", href: "#" },
      { title: "What can I do if the system is slow or lagging?", href: "#" },
      { title: "How do I customize font, icons and colors on Phone?", href: "#" },
      { title: "What can I do if the system is freezing or lagging?", href: "#" },
      { title: "What can I do if the fingerprint unlock is slow or unresponsive?", href: "#" },
    ],
  },
  {
    title: "Technical hardware",
    totalArticles: 0,
    articles: [
      { title: "How do I clean my Nothing Earphone/charging case?", href: "#" },
      { title: "Why is the sound distorted? The earphone sounds like it has an echo.", href: "#" },
      { title: "Why is the bass effect too weak in the headphones?", href: "#" },
      { title: "Why is the vibration of my watch too weak?", href: "#" },
      { title: "Why is the sound intermittent during a phone call on Nothing Ear (3)?", href: "#" },
    ],
  },
  {
    title: "Find my device issue",
    totalArticles: 0,
    articles: [
      { title: "What can I do if I can't find my device in the 'Find My' app on iOS phone after resetting the earbud?", href: "#" },
      { title: "What can I do if I cannot find the earbuds in the app when using the Find device feature?", href: "#" },
    ],
  },
  {
    title: "Display issue",
    totalArticles: 0,
    articles: [
      { title: "The Watch screen is flickering or flashing.", href: "#" },
      { title: "When receiving a call, why does the screen of the Watch not light up?", href: "#" },
      { title: "The Watch screen does not light up when I raise my hand.", href: "#" },
      { title: "When receiving a call, why does the Watch sometimes show the caller's name and sometimes the phone number?", href: "#" },
      { title: "Can I still use the Watch if the watch strap is broken?", href: "#" },
      { title: "How can I prevent the screen brightness from dimming when the Watch switches to AOD?", href: "#" },
    ],
  },
  {
    title: "Speaker issue",
    totalArticles: 0,
    articles: [
      { title: "What can I do to fix the low speaker volume on my Watch during calls?", href: "#" },
      { title: "What can I do to fix the low speaker volume on my Watch during calls?", href: "#" },
    ],
  },
  {
    title: "Notification issue",
    totalArticles: 9,
    articles: [
      { title: "When receiving a call, why does my Watch 3 Pro sometimes show the name of the caller, and sometimes show the number?", href: "#" },
      { title: "What can I do if my Watch 3 Pro does not receive messages after I connect it to an iOS phone?", href: "#" },
      { title: "What can I do when my Watch 3 Pro does not vibrate or flash the screen to notify me of messages or calls?", href: "#" },
      { title: "Why isn't my watch receiving message notifications?", href: "#" },
      { title: "Why isn't my watch receiving message notifications?", href: "#" },
      { title: "Why won't my Watch Pro receive message notifications?", href: "#" },
    ],
  },
  {
    title: "Firmware upgrade issue",
    totalArticles: 0,
    articles: [
      { title: "What can I do if I encounter an error while trying to upgrade my Watch 3 Pro?", href: "#" },
      { title: "What can I do if I encounter an error while trying to upgrade my Watch?", href: "#" },
    ],
  },
];

export function TroubleshootingClient() {
  const [search, setSearch] = React.useState("");

  const filtered = search.trim()
    ? sections
        .map((s) => ({
          ...s,
          articles: s.articles.filter((a) => a.title.toLowerCase().includes(search.toLowerCase())),
        }))
        .filter((s) => s.articles.length > 0)
    : sections;

  return (
    <div data-hide-dots="true" className="min-h-screen text-[#111] pt-20 bg-[#f4f4f2]">
      {/* ─── Breadcrumb + Search bar ─────────────────────────── */}
      <div>
        <div className="mx-auto flex max-w-[980px] items-center justify-between px-6 py-4 md:px-10">
          <nav className="flex items-center gap-2 font-lattera text-[11px] tracking-[0.16em] uppercase" style={{ color: "#2f5fb3" }}>
            <Link href="/support-centre" className="hover:underline">
              NOTHING
            </Link>
            <span className="text-black/30">/</span>
            <span className="text-black/50 tracking-[0.16em]">TROUBLESHOOTING</span>
          </nav>
          <div className="flex h-[38px] w-[240px] items-center gap-2 rounded-full bg-white px-4">
            <svg className="h-3.5 w-3.5 shrink-0 text-black/35" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="search"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="font-ntype-mono flex-1 bg-transparent text-[13px] font-[300] text-black outline-none placeholder:text-black/35"
            />
          </div>
        </div>
      </div>

      {/* ─── Page Title ──────────────────────────────────────── */}
      <div className="mx-auto max-w-[980px] px-6 pt-10 pb-8 md:px-10">
        <h1 className="font-ntype text-[clamp(2rem,4vw,3rem)] font-normal leading-none text-black">Troubleshooting</h1>
        <div className="mt-8">
          <button className="font-ntype-mono inline-flex h-[24px] items-center gap-2 rounded-full border border-black/20 bg-transparent px-5 text-[12px] font-[300] uppercase tracking-[0.06em] text-black">
            ALL
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* ─── Sections Grid ───────────────────────────────────── */}
      <div className="mx-auto max-w-[980px] px-6 pb-24 md:px-10">
        <div className="grid grid-cols-1 gap-x-20 gap-y-6 md:grid-cols-2">
          {filtered.map((section) => (
            <div key={section.title}>
              <h2 className="font-ntype text-[clamp(1.1rem,1.5vw,1.35rem)] font-normal text-black">{section.title}</h2>
              <div className="faq-dot-line my-3 h-[4px] w-full" />
              <ul className="space-y-[6px]">
                {section.articles.map((article) => (
                  <li key={article.title}>
                    <Link href={article.href} className="font-ntype-mono text-[13px] font-[300] leading-[20px] text-black hover:underline">
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>

              {section.totalArticles > 0 && (
                <Link
                  href="#"
                  className="font-ntype-mono mt-4 inline-flex items-center gap-1 text-[13px] font-[300] leading-[20px] text-[#002f6c] hover:underline"
                >
                  See all {section.totalArticles} articles
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
