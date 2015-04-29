user0 = User.create(username: 'jlpicard', password: 'password')
user1 = User.create(username: 'thedr', password: 'password')
user2 = User.create(username: 'mreynolds', password: 'password')
user3 = User.create(username: 'notanalien', password: 'password')
user4 = User.create(username: 'marvin', password: 'password')
user5 = User.create(username: 'adent', password: 'password')
user6 = User.create(username: 'zbeeblebrox', password: 'password')

current_year = DateTime.now.year
current_month = DateTime.now.month


mission0 = Mission.create(
  latitude: 75.75894014501688,
  longitude: -39.7265625,
  title: "Test New Metaphasic Shielding Tech",
  description: "We're embarking on a new frontier of shield technology. "\
               "Too often space explorers find themselves in an untenable "\
               "position, where hazardous environmental conditions arise "\
               "and you must drop whatever it is you're doing and retreat "\
               "to safety.\nBut no longer.\nJoin me on perhaps the most "\
               "revolutionary scientific discovery of our generation. "\
               "Metaphasic shielding will thrust humanity's exploration potential "\
               "beyond our wildist imagination. Soon traveling through the very "\
               "core of the sun will be as commonplace as jetpacking to the next "\
               "hover disc match.\n\n**I'm aware of the cloaking potential of "\
               "metaphasic shielding. Bounty hunters MAY NOT ENLIST.",
  leader_id: 1,
  compensation: 25000,
  user_limit: 5,
  start_date: DateTime.new(current_year, current_month, (1 + rand(14))).strftime("%F"),
  end_date: DateTime.new(current_year, current_month, (15 + rand(14))).strftime("%F")
)
mission1 = Mission.create(
  latitude: 64.4348920430406,
  longitude: -2.4609375,
  title: "Mercury Solar Observatory",
  description: "The burgeoning Mercury science scene is looking to expand even "\
               "further in the field of solar observation. We're looking "\
               "10 hard-working, preferably skintype-3* enhanced individuals "\
               "willing to work in extreme infrared AND gamma radiation "\
               "environments. Please be advised that if you have not received "\
               "the Helionic Demon vaccine you will not be considered for "\
               "this position.",
  leader_id: 2,
  compensation: 75000,
  user_limit: 11,
  start_date: DateTime.new(current_year, current_month, (1 + rand(14))).strftime("%F"),
  end_date: DateTime.new(current_year, current_month, (15 + rand(14))).strftime("%F")
)
mission2 = Mission.create(
  latitude: 60.43554230669233,
  longitude: -0.703125,
  title: "Restore Venus' Natural Beauty - Wisp Extermination",
  description: "Since it's original colonization by New Canadian radicals, Venus "\
               "has been a breading ground for everyone's least-liked "\
               "pest: the vomiting cloud wisp.\n It's no secret that nearly all "\
               "mesopheric and, especially, stratospheric cities are near "\
               "engulfed by the wisps iconic sludge.\nSo bring your phaser cannons, "\
               "your rail guns, and your quantum torpedo launchers to what should "\
               "be the greatest wisp hunt ever!!!!",
  leader_id: 3,
  compensation: 1000,
  start_date: DateTime.new(current_year, current_month, (1 + rand(14))).strftime("%F"),
  end_date: DateTime.new(current_year, current_month, (15 + rand(14))).strftime("%F")
)
mission3 = Mission.create(
  latitude: 60.19615576604439,
  longitude: -0.615234375,
  title: "Protect Venus' Treasured Wisps!!",
  description: "WISPERS EVERYWHERE! WE NEED YOUR HELP!!!\nA group of extremist"\
               " Terrans are threatening to erradicate the last remaining colony"\
               " of sky angels! This is no joke--your life is at stake."\
               "For those who are unsure, think again about the countless"\
               " years you haven't wasted tethered to the beta-1 reality, the near"\
               " doubling of your working hours by avoiding pitiful sleep. Think "\
               "again about squandering all your time and effort eating and drinking"\
               "every day of every week of every year. And then remember that the"\
               " sky angel nectar provides everything a human needs and so, so"\
               " much more.",
  leader_id: 4,
  start_date: DateTime.new(current_year, current_month, (1 + rand(14))).strftime("%F"),
  end_date: DateTime.new(current_year, current_month, (15 + rand(14))).strftime("%F")
)
mission4 = Mission.create(
  latitude: 50.56928286558243,
  longitude: -2.2412109375,
  title: "Workers Needed for Olympus Mons Core Plunge",
  description: "Six Flags Mars will soon be the largest surface-level"\
               " theme park in the solar system. We need your help to take it "\
               "one step...lower.\nSix Flags Mars is breaking ground on "\
               "the most intense lava flume ride in history. It starts at the "\
               "Martian surface, dives straight through the core, peeks out"\
               " at the other side, drops back through the core, and finally"\
               " emerges back at the drop site. The Olympus Mons Core Plunge"\
               " promises to be the most intense planet-bound thrill ride yet!"\
               "\nSkintype-3* is a must. Full-time. Free life extension serum "\
               "for 200 years after the project is completed.",
  leader_id: 5,
  compensation: 20000,
  user_limit: 30,
  start_date: DateTime.new(current_year, current_month, (1 + rand(14))).strftime("%F"),
  end_date: DateTime.new(current_year, current_month, (15 + rand(14))).strftime("%F")
)
mission5 = Mission.create(
  latitude: 55.35413531021057,
  longitude: 0.3955078125,
  title: "War. War never changes.",
  description: "The Romans waged war to gather slaves and wealth. Spain built an "\
               "empire from its lust for gold and territory. Hitler shaped a battered"\
               " Germany into an economic superpower.\nBut war never changes.\n"\
               "In the 21st centure, war was still waged over the resources that"\
               " could be acquired. Only this time, the spoils of war were also"\
               " its weapons: Petroleum and Uranium. For these resources, China "\
               "would invade Alaska, the US would annex Canada, and the European"\
               " Commonwealth would dissolve into quarreling, bickering nation-states"\
               ", bent on controlling the last remaining resources on Earth.\n"\
               "In 2077, the storm of world war had come again. In two brief hours"\
               ", most of the planet was reduced to cinders. And from the ashes "\
               "of nuclear devastation, a new civilization would struggle to arise."\
               "\nA few were able to reach the relative safety of the large"\
               " underground Vaults. "\
               "Imprisoned safely behind the large Vault "\
               "door, under a mountain of stone, a generation has lived without "\
               "knowledge of the outside world.\nLife in the Vault is about to change."\
               "\nJoin The Master, gain unfathomable power, unite all Terrans.",
  leader_id: 6,
  compensation: 100000,
  start_date: DateTime.new(current_year, current_month, (1 + rand(14))).strftime("%F"),
  end_date: DateTime.new(current_year, current_month, (15 + rand(14))).strftime("%F")
)
mission6 = Mission.create(
  latitude: 55.94919982336746,
  longitude: -7.55859375,
  title: "help find my 2 lost screeching moon whales",
  description: "My moon whales are gone. They burrowed under the mare last night"\
               "and I haven't seen or heard them since, which is very surprising "\
               "to say the least. Reward: $100,000.\nPlease hurry! Once they get"\
               " a taste for moon worm they'll keep eating until half the moon is "\
               "gone.",
  leader_id: 7,
  compensation: 100000,
  user_limit: 2,
  start_date: DateTime.new(current_year, current_month, (1 + rand(14))).strftime("%F"),
  end_date: DateTime.new(current_year, current_month, (15 + rand(14))).strftime("%F")
)
mission7 = Mission.create(
  latitude: 0.8788717828324276,
  longitude: -13.0078125,
  title: "Experienced Camera Operator - Storm Chasers Jupiter",
  description: "Storm Chasers Jupiter is looking to fill the following position:"\
               " CAMERA OPERATOR (100-300 yrs experience required).\n"\
               "If you or anyone you know is interesting in applying, please"\
               "enlist in this mission and our HR department will be in contact"\
               " shortly.",
  leader_id: 1,
  compensation: 50000,
  user_limit: 2,
  start_date: DateTime.new(current_year, current_month, (1 + rand(14))).strftime("%F"),
  end_date: DateTime.new(current_year, current_month, (15 + rand(14))).strftime("%F")
)
mission8 = Mission.create(
  latitude: -33.43144133557529,
  longitude: 7.734375,
  title: "Visionary Leader - Artist Colony (4th Ring Base, Saturn)",
  description: "The 4th Ring Base Saturn Colony was established for one purpose: "\
               "to capture the ineffable, ethereal beauty of Saturn's most "\
               "iconic feature.\nTo say our colony has lost its direction is"\
               "a vast understatement. Nearly half our members have left, and "\
               "the rest are about to. We need new inspiration!",
  leader_id: 2,
  compensation: 50,
  user_limit: 2,
  start_date: DateTime.new(current_year, current_month, (1 + rand(14))).strftime("%F"),
  end_date: DateTime.new(current_year, current_month, (15 + rand(14))).strftime("%F")
)
mission9 = Mission.create(
  latitude: -70.37785394109224,
  longitude: 1.7578125,
  title: "Dilithium Miners Wanted",
  description: "Ever wanted to join the extremely lucrative Dilithium Mining "\
               "Industry?\nDid you know Dilithium Miners make on avergage 30x "\
               "more than any trilithium miner?\nDon't miss this opportunity "\
               "to start your career on the right track by joining the fastest-"\
               "growing spaceship resource industry in the solar system! All "\
               "positions are open! Apply today!",
  leader_id: 3,
  compensation: 10000,
  user_limit: 101,
  start_date: DateTime.new(current_year, current_month, (1 + rand(14))).strftime("%F"),
  end_date: DateTime.new(current_year, current_month, (15 + rand(14))).strftime("%F")
)
mission10 = Mission.create(
  latitude: -75.58493740869223,
  longitude: -7.03125,
  title: "Now Hiring Park Ranger - Neptune Springs Planetary Park",
  description: "Neptune, the last pristine wilderness in our solar system, is "\
               "home to the most diverse marine ecosystem yet-known.\n"\
               "Neptune Springs Planetary Park covers nearly 1/4 of the planet "\
               "surface. It's visited by over 50,000 people every day, making "\
               "it the 2nd most popular planetary park next to Crystal Caves."\
               "\nWe're looking for an experienced park ranger capable of "\
               "overseeing and managing the land-area equivalent of Earth.\n"\
               "Serious replies only. Neptune Planetary Park is a non-GMH-"\
               "discriminatory company.",
  leader_id: 4,
  compensation: 45000,
  user_limit: 2,
  start_date: DateTime.new(current_year, current_month, (1 + rand(14))).strftime("%F"),
  end_date: DateTime.new(current_year, current_month, (15 + rand(14))).strftime("%F")
)
mission11 = Mission.create(
  latitude: -10.487811882056695,
  longitude: -95.625,
  title: "Bounty Hunt",
  description: "Most recent photos are listed above.\nNAME: Zaphod "\
               "Beeblebrox.\nAGE: unknown.\nLast seen at the location listed "\
               "above in large, spherical white ship.\nStealth is highly "\
               "recommended, as ship does have the ability to transport with"\
               "out a trace.",
  leader_id: 5,
  compensation: 60000,
  start_date: DateTime.new(current_year, current_month, (1 + rand(14))).strftime("%F"),
  end_date: DateTime.new(current_year, current_month, (15 + rand(14))).strftime("%F")
)
mission12 = Mission.create(
  latitude: -81.09321385260837,
  longitude: 141.328125,
  title: "Join the Impending Invasion",
  description: "Please join me, Zrek (aka 'E.T.' according to your species' archives)"\
               " as I and my fellow Grebleips take control of the Solar System."\
               "\nThe meeting coordinates are listed in the above map.\nYes, my "\
               "previous visit to Earth was a surveillance mission. No, I hate that "\
               "child. Your archives fail to mention the subsequent capture of "\
               "Elliot and his entire family for purposes of scientific analysis "\
               "and dissection.\nThose humans who join our cause may live on in our "\
               "zoos. All others will be hunted and eaten at the whim of all Grebleips.",
  leader_id: 6,
  start_date: DateTime.new(current_year, current_month, (1 + rand(14))).strftime("%F"),
  end_date: DateTime.new(current_year, current_month, (15 + rand(14))).strftime("%F")
)
mission13 = Mission.create(
  latitude: -79.44042711548629,
  longitude: -0.966796875,
  title: "Pluto Planetary Society Needs Workers",
  description: "The Pluto Planetary Society, Pluto (a full planet), have "\
               "hundreds of vacancies for pretty much every position you can think "\
               "of. Our startup colony is essentially broke since we have no "\
               "significant economy to speak of, but that's why we need young, "\
               "inspired minds to invigorate this great planet's society.\n"\
               "Please. Anyone. It's so lonely here.",
  leader_id: 7,
  compensation: 20,
  start_date: DateTime.new(current_year, current_month, (1 + rand(14))).strftime("%F"),
  end_date: DateTime.new(current_year, current_month, (15 + rand(14))).strftime("%F")
)
