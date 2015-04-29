user0 = User.create(username: 'jlpicard', password: 'password')
user1 = User.create(username: 'thedr', password: 'password')
user2 = User.create(username: 'mreynolds', password: 'password')
user3 = User.create(username: 'notanalien', password: 'password')
user4 = User.create(username: 'marvin', password: 'password')
user5 = User.create(username: 'adent', password: 'password')
user6 = User.create(username: 'zbeeblebrox', password: 'password')
user7 = User.create(username: 'borg', password: 'password')
user8 = User.create(username: 'zcochrane', password: 'password')

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
               "hover disc match.\n\n**NOTE: I'm aware of the cloaking potential of "\
               "metaphasic shielding. Bounty hunters MAY NOT ENLIST.",
  leader_id: 1,
  compensation: 25000,
  user_limit: 5,
  start_date: DateTime.new(current_year, current_month, (1 + rand(14))).strftime("%F"),
  end_date: DateTime.new(current_year, current_month, (15 + rand(14))).strftime("%F")
)
mission0.images.create(
  filepicker_url: "https://www.filepicker.io/api/file/TQDD4sjEQEumrn1cHQAJ"
)
mission0.images.create(
  filepicker_url: "https://www.filepicker.io/api/file/dIK3cGVMTBGSMVyDjhuX"
)


mission1 = Mission.create(
  latitude: 64.4348920430406,
  longitude: -2.4609375,
  title: "Mercury Solar Observatory",
  description: "The burgeoning Mercury science scene is looking to expand even "\
               "further in the field of solar observation. We're looking for "\
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
mission1.images.create(
  filepicker_url: "https://www.filepicker.io/api/file/wWfBr8aYTfapMkriwtYe"
)
mission1.images.create(
  filepicker_url: "https://www.filepicker.io/api/file/X73DpfXRSUKMzRFE1IsZ"
)


mission2 = Mission.create(
  latitude: 60.43554230669233,
  longitude: -0.703125,
  title: "Restore Venus' Natural Beauty - Wisp Extermination",
  description: "Since it's original colonization by New Canadian radicals, Venus "\
               "has been a breading ground for everyone's least-liked "\
               "pest: the vomiting cloud wisp.\n It's no secret that nearly all "\
               "mesopheric and, especially, stratospheric cities are near-"\
               "engulfed by the wisps iconic sludge.\nSo bring your phaser cannons, "\
               "your rail guns, and your quantum torpedo launchers to what should "\
               "be the greatest--and last--wisp hunt ever!!!!",
  leader_id: 3,
  compensation: 1000,
  start_date: DateTime.new(current_year, current_month, (1 + rand(14))).strftime("%F"),
  end_date: DateTime.new(current_year, current_month, (15 + rand(14))).strftime("%F")
)
mission2.images.create(
  filepicker_url: "https://www.filepicker.io/api/file/M86qBsXGTw6cjqNNvAZz"
)
mission2.images.create(
  filepicker_url: "https://www.filepicker.io/api/file/yMpKiuoiR7yzcencPDSi"
)


mission3 = Mission.create(
  latitude: 60.19615576604439,
  longitude: -0.615234375,
  title: "Protect Venus' Treasured Wisps!!",
  description: "WISPERS EVERYWHERE! WE NEED YOUR HELP!!!\nA group of extremist"\
               " Terrans are threatening to erradicate the last remaining colony"\
               " of sky angels! This is no joke--your life is at stake. "\
               "For those who are unsure, think again about the countless"\
               " years you haven't wasted tethered to the alpha-0 reality, the near"\
               " doubling of your working hours by avoiding pitiful sleep. Think "\
               "again about squandering all your time and effort eating and drinking"\
               " every day of every week of every year. And then remember that the"\
               " sky angel nectar provides everything a human needs and so, so"\
               " much more.\nRemember what you were before, and what you are now."\
               " We must defind our livelihood.",
  leader_id: 4,
  start_date: DateTime.new(current_year, current_month, (1 + rand(14))).strftime("%F"),
  end_date: DateTime.new(current_year, current_month, (15 + rand(14))).strftime("%F")
)
mission3.images.create(
  filepicker_url: "https://www.filepicker.io/api/file/vIiN2agQmmvGw9Vx0J4K"
)
mission3.images.create(
  filepicker_url: "https://www.filepicker.io/api/file/s8P4ljCtSi8wy7Chfcfv"
)


mission4 = Mission.create(
  latitude: 50.56928286558243,
  longitude: -2.2412109375,
  title: "Workers Needed for Olympus Mons Core Plunge",
  description: "Six Flags Mars will soon be the largest surface-level"\
               " theme park in the solar system! We need your help to take it "\
               "one step...lower.\nSix Flags Mars is breaking ground on "\
               "the most intense lava flume ride in history. It starts at the "\
               "Martian surface, dives straight through the core, peeks out"\
               " at the other side, drops back through the core, and finally"\
               " emerges back at the drop site. The Olympus Mons Core Plunge"\
               " promises to be the most intense planet-bound thrill ride yet!"\
               "\nSkintype-3* is a must. Full-time. Free life extension serum "\
               "for 200 years after the project completion.",
  leader_id: 5,
  compensation: 20000,
  user_limit: 30,
  start_date: DateTime.new(current_year, current_month, (1 + rand(14))).strftime("%F"),
  end_date: DateTime.new(current_year, current_month, (15 + rand(14))).strftime("%F")
)
mission4.images.create(
  filepicker_url: "https://www.filepicker.io/api/file/qkLOzq29RkCOSnoRjqht"
)
mission4.images.create(
  filepicker_url: "https://www.filepicker.io/api/file/1keZc3TtCjY7fF5kSWxw"
)


mission5 = Mission.create(
  latitude: 55.35413531021057,
  longitude: 0.3955078125,
  title: "War. War never changes.",
  description: "The Romans waged war to gather slaves and wealth. Spain built an "\
               "empire from its lust for gold and territory. Hitler shaped a battered"\
               " Germany into an economic superpower.\nBut war never changes.\n"\
               "In the 21st century, war was still waged over the resources that"\
               " could be acquired. Only this time, the spoils of war were also"\
               " its weapons: Petroleum and Uranium. For these resources, China "\
               "would invade Alaska, the US would annex Canada, and the European"\
               " Commonwealth would dissolve into quarreling, bickering nation-states"\
               ", bent on controlling the last remaining resources on Earth.\n"\
               "In 2077, the storm of world war had come again. In two brief hours"\
               ", most of the planet was reduced to cinders. And from the ashes "\
               "of nuclear devastation, a new civilization is struggling to arise."\
               "\nEarth is in chaos. Its reputation tarnished. The need for a stern "\
               " and wise leader is apparent now more than ever."\
               "\nJoin The Master, gain unfathomable power, unite all Terrans.",
  leader_id: 6,
  compensation: 100000,
  start_date: DateTime.new(current_year, current_month, (1 + rand(14))).strftime("%F"),
  end_date: DateTime.new(current_year, current_month, (15 + rand(14))).strftime("%F")
)
mission5.images.create(
  filepicker_url: "https://www.filepicker.io/api/file/snrM00N8QayoF499DfYc"
)
mission5.images.create(
  filepicker_url: "https://www.filepicker.io/api/file/yOYA1NOZSueD5AcvI1tQ"
)


mission6 = Mission.create(
  latitude: 55.94919982336746,
  longitude: -7.55859375,
  title: "help find my 2 lost screeching moon whales",
  description: "My moon whales are gone. They burrowed under the mare last night "\
               "and I haven't seen or heard them since, which is very surprising "\
               "to say the least. Reward: $100,000.\nPlease hurry! Once they get"\
               " a taste for moon worm they'll keep eating until half the moon is "\
               "gone!",
  leader_id: 7,
  compensation: 100000,
  user_limit: 2,
  start_date: DateTime.new(current_year, current_month, (1 + rand(14))).strftime("%F"),
  end_date: DateTime.new(current_year, current_month, (15 + rand(14))).strftime("%F")
)
mission6.images.create(
  filepicker_url: "https://www.filepicker.io/api/file/aRfaVYZnRy6JPjWE9zIa"
)
mission6.images.create(
  filepicker_url: "https://www.filepicker.io/api/file/6LKxJIg3TEKyz4uBsPBE"
)


mission7 = Mission.create(
  latitude: 0.8788717828324276,
  longitude: -13.0078125,
  title: "Experienced Camera Operator - Storm Chasers Jupiter",
  description: "Storm Chasers Jupiter is looking to fill the following position:"\
               " CAMERA OPERATOR (100-300 yrs experience required).\n"\
               "If you or anyone you know is interesting in applying, please "\
               "enlist in this mission and our HR department will be in contact"\
               " shortly.",
  leader_id: 1,
  compensation: 50000,
  user_limit: 2,
  start_date: DateTime.new(current_year, current_month, (1 + rand(14))).strftime("%F"),
  end_date: DateTime.new(current_year, current_month, (15 + rand(14))).strftime("%F")
)
mission7.images.create(
  filepicker_url: "https://www.filepicker.io/api/file/23C5sANSqSetjLoziVUw"
)
mission7.images.create(
  filepicker_url: "https://www.filepicker.io/api/file/Wxu8WjNBShWqPlzoP79A"
)


mission8 = Mission.create(
  latitude: -33.43144133557529,
  longitude: 7.734375,
  title: "Visionary Leader - Artist Colony (4th Ring Base, Saturn)",
  description: "The 4th Ring Base Saturn Colony was established for one purpose: "\
               "to capture the ineffable, ethereal beauty of Saturn's most "\
               "iconic feature.\nTo say our colony has lost its direction is "\
               "a vast understatement. Nearly half our members have left, and "\
               "the rest are just about to. We need new inspiration! Oh, and "\
               "please bring several barrels of Cordrazine--our supplies are low.",
  leader_id: 2,
  compensation: 50,
  user_limit: 2,
  start_date: DateTime.new(current_year, current_month, (1 + rand(14))).strftime("%F"),
  end_date: DateTime.new(current_year, current_month, (15 + rand(14))).strftime("%F")
)
mission8.images.create(
  filepicker_url: "https://www.filepicker.io/api/file/zRYOiWKTTGqhjObEUAPq"
)
mission8.images.create(
  filepicker_url: "https://www.filepicker.io/api/file/ebx2EZSCQOyUWyGhpGet"
)


mission9 = Mission.create(
  latitude: -70.37785394109224,
  longitude: 1.7578125,
  title: "Dilithium Miners Wanted",
  description: "Ever wanted to join the extremely lucrative Dilithium Mining "\
               "Industry?\nDid you know Dilithium Miners make on average 30x "\
               "more than any trilithium miner?\nDon't miss this opportunity "\
               "to start your career on the right track by joining the fastest-"\
               "growing spaceship resource industry in the solar system! All "\
               "positions are open! Enlist today!",
  leader_id: 3,
  compensation: 10000,
  user_limit: 101,
  start_date: DateTime.new(current_year, current_month, (1 + rand(14))).strftime("%F"),
  end_date: DateTime.new(current_year, current_month, (15 + rand(14))).strftime("%F")
)
mission9.images.create(
  filepicker_url: "https://www.filepicker.io/api/file/QF2b9BtcTmCAPjzNBhJQ"
)
mission9.images.create(
  filepicker_url: "https://www.filepicker.io/api/file/77CW8j71TJq1MG4xAk9R"
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
               "Serious replies only. Neptune Planetary Park is a GMH-"\
               "non-discriminatory company.",
  leader_id: 4,
  compensation: 45000,
  user_limit: 2,
  start_date: DateTime.new(current_year, current_month, (1 + rand(14))).strftime("%F"),
  end_date: DateTime.new(current_year, current_month, (15 + rand(14))).strftime("%F")
)
mission10.images.create(
  filepicker_url: "https://www.filepicker.io/api/file/JiZsQji7SWeeccTQVBA9"
)
mission10.images.create(
  filepicker_url: "https://www.filepicker.io/api/file/s8ml247DSeqZcD9CJWKz"
)


mission11 = Mission.create(
  latitude: -10.487811882056695,
  longitude: -95.625,
  title: "Bounty Hunt",
  description: "Most recent photos are listed above.\nNAME: Zaphod "\
               "Beeblebrox.\nAGE: unknown.\nLast seen at the location listed "\
               "above in large, spherical white ship.\nShip has the ability "\
               "to transport without a trace--stealth is highly recommended. "\
               "Present a live human on Lunar Base 3C to receive compensation.",
  leader_id: 5,
  compensation: 60000,
  start_date: DateTime.new(current_year, current_month, (1 + rand(14))).strftime("%F"),
  end_date: DateTime.new(current_year, current_month, (15 + rand(14))).strftime("%F")
)
mission11.images.create(
  filepicker_url: "https://www.filepicker.io/api/file/iNdBDVqS5qFq44Hpw1l9"
)
mission11.images.create(
  filepicker_url: "https://www.filepicker.io/api/file/OP0G00iDSRac0LpfGtgA"
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
               "Elliott and his entire family for purposes of scientific analysis "\
               "and dissection.\nThose humans who join our cause may live on in our "\
               "zoos. The remainder will be hunted and eaten at the whim of all Grebleips.",
  leader_id: 6,
  start_date: DateTime.new(current_year, current_month, (1 + rand(14))).strftime("%F"),
  end_date: DateTime.new(current_year, current_month, (15 + rand(14))).strftime("%F")
)
mission12.images.create(
  filepicker_url: "https://www.filepicker.io/api/file/S6k9zQyQSiSwyfH3g0EL"
)
mission12.images.create(
  filepicker_url: "https://www.filepicker.io/api/file/8Nu89BZESGGDA7H1BJ5Q"
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
mission13.images.create(
  filepicker_url: "https://www.filepicker.io/api/file/T5ZuHc2xQS6OS6azvqT0"
)
mission13.images.create(
  filepicker_url: "https://www.filepicker.io/api/file/CNd20lKGQiamtVRUfv1D"
)

mission14 = Mission.create(
  latitude: -77.61770905279674,
  longitude: -119.53125,
  title: "YOU WILL BE ASSIMILATED",
  description: "WE ARE THE BORG. LOWER YOUR SHIELDS AND SURRENDER YOU SHIPS. "\
               "WE WILL ADD YOUR BIOLOGICAL AND TECHNOLOGICAL DISTINCTIVENESS "\
               "TO OUR OWN. YOUR CULTURE WILL ADAPT TO SERVE US. RESISTANCE IS "\
               "FUTILE.",
  leader_id: 8,
  start_date: DateTime.new(current_year, current_month, (1 + rand(14))).strftime("%F"),
  end_date: DateTime.new(current_year, current_month, (15 + rand(14))).strftime("%F")
)
mission14.images.create(
  filepicker_url: "https://www.filepicker.io/api/file/LyO1dbVQTl2bmDSuf5Gj"
)

mission15 = Mission.create(
  latitude: 45.583289756006316,
  longitude: -68.203125,
  title: "Phoenix - Mission to Alpha Centauri",
  description: "I've successfully tested the Pheonix's revolutionary warp drive"\
               "a handful of times. It's time to push the bounds of our species even "\
               "further. I'm looking for a fellow physicist/mechanical engineer "\
               "to join me on the first mission, man or unmanned, to another star "\
               "system. Of course you must be familiar with my warp drive theory, "\
               "and a healthy sense of human would be appreciated."
)
mission15.images.create(
  filepicker_url: "https://www.filepicker.io/api/file/C5n4bt4DRuCMTGidSVzp"
)
mission15.images.create(
  filepicker_url: "https://www.filepicker.io/api/file/vbvQnv2YQX2rE2gCS4i3"
)
