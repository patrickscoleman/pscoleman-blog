"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const GenjoKoanText = () => {
  const [jpn, setJpn] = useState(true);
  const [eng, setEng] = useState(true);
  return (
    <>
      <style>
        {`
          #jpn {
            ${jpn ? "display: block;" : "display: none;"}
          }
          #eng {
            ${eng ? "display: block;" : "display: none;"}
          }
          br {
            ${jpn || eng ? "display: block;" : "display: none;"}
          }
       `}
      </style>
      <div style={{ marginBottom: "2rem", marginTop: "2rem" }}>
        <span>Choose which languages to display: </span>
        <ToggleGroup type="multiple" className="justify-start mt-2">
          <ToggleGroupItem
            value="jpn"
            variant={jpn ? "outline" : "default"}
            onClick={function () {
              setJpn(!jpn);
            }}
          >
            Japanese
          </ToggleGroupItem>
          <ToggleGroupItem
            value="eng"
            variant={eng ? "outline" : "default"}
            onClick={function () {
              setEng(!eng);
            }}
          >
            English
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <h3 id="jpn">現成公案</h3>
      <h3 id="eng">Genjo Koan (statement on becoming the present)</h3>
      <br />
      <p id="jpn">
        諸法の仏法なる時節、すなはち迷悟あり、修行あり、生あり死あり、諸仏あり衆生あり。
      </p>
      <p id="eng">
        In this moment, the Buddhadharma (the law of awakening) is in all
        things, which is to say: there is delusion and realization; there is
        practice; there is birth and there is death; there are many buddhas (the
        awakened) and there are the masses of people.
      </p>
      <p id="jpn">
        万法ともにわれにあらざる時節、まどひなくさとりなく、諸仏なく衆生なく、生なく滅なし。
      </p>
      <p id="eng">
        In this moment, there is no self in all things: there is no delusion and
        there is no realization; there are no buddhas and there are no masses of
        people; there is no birth and there is no death.
      </p>
      <p id="jpn">
        仏道もとより豊倹より跳出せるゆゑに、生滅あり、迷悟あり、生仏あり。
      </p>
      <p id="eng">
        Leaping free from the foundations of the Buddhist path and from
        abundance and absence: there is birth and death; there is delusion and
        realization; there are people and buddhas.
      </p>
      <p id="jpn">
        しかもかくのごとくなりといへども、花は愛惜にちり、草は棄嫌におふるのみなり。
      </p>
      <p id="eng">
        But even though this is how it is, flowers fall in attachment and weeds
        spread in aversion. It is just that.
      </p>
      <br />
      <p id="jpn">
        自己をはこびて万法を修証するを迷とす、万法すすみて自己を修証するはさとりなり。
      </p>
      <p id="eng">
        To carry oneself and to comprehend all things is called delusion; that
        all things advance and selves are comprehended is realization.
      </p>
      <p id="jpn">迷を大悟するは諸仏なり、悟に大迷なるは衆生なり。</p>
      <p id="eng">
        Those who greatly realize delusion are the many buddhas, and those who
        have great delusion of realization are the masses of people.
      </p>
      <p id="jpn">さらに悟上に得悟する漢あり、迷中又迷の漢あり。</p>
      <p id="eng">
        Furthermore, there are men and women who have realization beyond
        realization, and there are men and women who in the midst of delusion
        are again deluded.
      </p>
      <p id="jpn">
        諸仏のまさしく諸仏なるときは、自己は諸仏なりと覚知することをもちゐず。
      </p>
      <p id="eng">
        When the many buddhas are truly buddhas, there is no comprehension that
        they themselves are the many buddhas.
      </p>
      <p id="jpn">しかあれども証仏なり、仏を証しもてゆく。 </p>
      <p id="eng">
        However they are realized buddhas, and they carry on realizing buddhas.
      </p>
      <br />
      <p id="jpn">
        身心を挙して色を見取し、身心を挙して声を聴取するに、したしく会取すれども、かがみに影をやどすがごとくにあらず。
      </p>
      <p id="eng">
        Perceiving forms with the entire body and mind and hearing sounds with
        the entire body and mind, one experiences them directly, unlike a
        reflection housed in a mirror.
      </p>
      <p id="jpn">水と月とのごとくにあらず。</p>
      <p id="eng">Unlike the moon and water.</p>
      <p id="jpn">一方を証するときは一方はくらし。 </p>
      <p id="eng">When one side is revealed, the other is dark.</p>
      <br />
      <p id="jpn">仏道をならふといふは、自己をならふなり。 </p>
      <p id="eng">
        To grow accustomed to the Buddhist path is to grow accustomed to the
        self.
      </p>
      <p id="jpn">自己をならふといふは、自己をわするるなり。 </p>
      <p id="eng">To grow accustomed to the self is to forget the self.</p>
      <p id="jpn">自己をわするるといふは、万法に証せらるるなり。 </p>
      <p id="eng">To forget the self is to be revealed by all things.</p>
      <p id="jpn">
        万法に証せらるるといふは、自己の身心および他己の身心をして脱落せしむるなり。
      </p>
      <p id="eng">
        To be revealed by all things is to shed one&apos;s body and mind and the
        bodies and minds of others.
      </p>
      <p id="jpn">悟迹の休歇なるあり、休歇なる悟迹を長々出ならしむ。 </p>
      <p id="eng">
        Traces of realization are lost, and the lost traces of realization
        endlessly go out.
      </p>
      <br />
      <p id="jpn">
        人、はじめて法をもとむるとき、はるかに法の辺際を離却せり。{" "}
      </p>
      <p id="eng">
        People, when first seeking the path, are far far away from even the
        path&apos;s edges.
      </p>
      <p id="jpn">法すでにおのれに正伝するとき、すみやかに本分人なり。 </p>
      <p id="eng">
        When the path has already been correctly transmitted, one quickly
        becomes a true person.
      </p>
      <br />
      <p id="jpn">
        人、舟にのりてゆくに、めをめぐらして岸をみれば、きしのうつるとあやまる。
      </p>
      <p id="eng">
        People, when riding in a boat and gazing at the shore, wrongly see the
        shore as moving.
      </p>
      <p id="jpn">
        目をしたしく舟につくれば、ふねのすすむをしるがごとく、身心を亂想して万法を弁肯するには、自心自性は常住なるかとあやまる。
      </p>
      <p id="eng">
        But just as one knows a boat advances when keeping their eyes directly
        fixed on the boat, one wrongly believes their self and their nature are
        everlasting when trying to distinguish between all things with a
        confused body and mind.
      </p>
      <p id="jpn">
        もし行李をしたしくして箇裏に歸すれば、万法のわれにあらぬ道理あきらけし。
      </p>
      <p id="eng">
        If one follows the path directly and returns home to one&apos;s self,
        the truth that there is no self in all things becomes clear.
      </p>
      <br />
      <p id="jpn">
        たき木はひとなる、さらにかへりてたき木となるべきにあらず。{" "}
      </p>
      <p id="eng">
        Firewood becomes ash, and it must never again become firewood.
      </p>
      <p id="jpn">しかあるを、灰はのち、薪はさきと見取すべからず。 </p>
      <p id="eng">
        However, do not perceive ash as after and firewood as before.{" "}
      </p>
      <p id="jpn">しるべし、薪は薪の法位に住して、さきありのちあり。</p>
      <p id="eng">
        Know that firewood resides in the nature of firewood; there is before
        and there is after.
      </p>
      <p id="jpn">前後ありといへども、前後際断せり。 </p>
      <p id="eng">
        While it&apos;s said that there is before and after, before and after
        are separate.
      </p>
      <p id="jpn">灰は灰の法位にありて、のちありさきあり。 </p>
      <p id="eng">
        Ash is in the nature of ash; there is after and there is before.
      </p>
      <br />
      <p id="jpn">
        かのたき木、はひとなりぬるのち、さらに薪とならざるがごとく、人のしぬるのち、さらに生とならず。
      </p>
      <p id="eng">
        Just as firewood becomes ash and will never again become firewood, after
        people die, they are never born again.
      </p>
      <p id="jpn">
        しかあるを、生の死になるといはざるは、仏法のさだまれるならひなり。
      </p>
      <p id="eng">
        However it cannot be said that birth becomes death; this is a
        long-settled rule in Buddhism.
      </p>
      <p id="jpn">このゆゑに不生といふ。 </p>
      <p id="eng">Therefore it&apos;s called non-birth.</p>
      <p id="jpn">死の生にならざる、法輪のさだまれる仏転なり。 </p>
      <p id="eng">
        Death does not become birth; this is a long-settled Buddhist tenet.
      </p>
      <p id="jpn">このゆゑに不滅といふ。 </p>
      <p id="eng">Therefore it&apos;s called non-death. </p>
      <p id="jpn">生も一時のくらゐなり、死も一時のくらゐなり。 </p>
      <p id="eng">
        Birth is an instantaneous state; and death too is an instantaneous
        state.
      </p>
      <br />
      <p id="jpn">たとへば、冬と春のごとし。</p>
      <p id="eng">For example, it&apos;s like winter and spring.</p>
      <p id="jpn">冬の春となるとおもはず、春の夏となるといはぬなり。 </p>
      <p id="eng">
        It is not thought that winter becomes spring, and it&apos;s not said
        that spring becomes summer.
      </p>
      <br />
      <p id="jpn">人のさとりをうる、水に月のやどるがごとし。 </p>
      <p id="eng">
        A person attaining realization is like the moon residing in water.
      </p>
      <p id="jpn">月ぬれず、水やぶれず。 </p>
      <p id="eng">
        The moon doesn&apos;t get wet, and the water doesn&apos;t break.
      </p>
      <p id="jpn">
        ひろくおほきなるひかりにてあれど、尺寸の水にやどり、全月も弥天も、くさの露にもやどり、一滴の水にもやどる。
      </p>
      <p id="eng">
        While the light is great and spacious, the whole moon and the whole sky
        reside in a puddle an inch wide, or even in the dew on the grass, or
        even in a single drop of water.
      </p>
      <p id="jpn">さとりの人をやぶらざる事、月の水をうがたざるがごとし。</p>
      <p id="eng">
        Realization does not break a person, just as the moon does not pierce
        the water.
      </p>
      <p id="jpn">
        人のさとりをけい礙せざること、滴露の天月をけい礙せざるがごとし。
      </p>
      <p id="eng">
        And a person does not hinder realization, just as a drop of dew does not
        hinder the sky or the moon.
      </p>
      <p id="jpn">ふかきことは、たかき分量なるべし。 </p>
      <p id="eng">Its depth must be its height.</p>
      <p id="jpn">時節の長短は、大水小水を検点し、天月の広狹を弁取すべし。 </p>
      <p id="eng">
        In this long or short moment, know the width or narrowness of the sky
        and moon by the greatness of the water or the smallness of the water.
      </p>
      <br />
      <p id="jpn">身心に法いまだ参飽せざるには、法すでにたれりとおぼゆ。 </p>
      <p id="eng">
        Not having followed the Dharma (the path, the law) completely with
        one&apos;s body and mind, one thinks the Dharma is already enough.
      </p>
      <p id="jpn">
        法もし身心に充足すれば、ひとかたは、たらずとおぼゆるなり。{" "}
      </p>
      <p id="eng">
        If the Dharma completely fills one&apos;s body and mind, a person
        recalls that it&apos;s not enough.
      </p>
      <br />
      <p id="jpn">
        たとへば、船にのりて山なき海中にいでて四方をみるに、ただまろにのみみゆ、さらにことなる相みゆることなし。
      </p>
      <p id="eng">
        For example when riding on a boat in the middle of the mountainless
        ocean and looking in the four directions, it looks perfectly round,
        taking on no other shape.
      </p>
      <p id="jpn">
        しかあれど、この大海、まろなるにあらず、方なるにあらず、のこれる海徳つくすべからざるなり。
      </p>
      <p id="eng">
        However this great ocean is neither round nor square; the ocean&apos;s
        merits are endless and cannot be used up.
      </p>
      <p id="jpn">宮殿のごとし、瓔珞のごとし。</p>
      <p id="eng">It&apos;s like a palace, like a jeweled necklace.</p>
      <p id="jpn">
        ただ、わがまなこのおよぶところ、しばらくまろにみゆるのみなり。{" "}
      </p>
      <p id="eng">
        It&apos;s just that from where one looks out, it begins to take on a
        circular appearance.
      </p>
      <p id="jpn">かれがごとく、万法またしかあり。</p>
      <p id="eng">All things are just this way.</p>
      <br />
      <p id="jpn">
        塵中格外，おほく樣子を帶せりといへども、参学眼力のおよぶばかりを見取會取するなり。
      </p>
      <p id="eng">
        In the midst of the dust and what&apos;s beyond, one only sees and
        comprehends the conditions (the state of things) that he or she is able
        to grasp with the strength of his or her practice, studies, and
        insights.
      </p>
      <p id="jpn">
        万法の家風をきかんには、方円とみゆるほかに、のこりの海徳山徳おほくきはまりなく、よもの世界あることをしるべし。
      </p>
      <p id="eng">
        To know the nature (the home wind) of all things, one must know the
        world (in all four directions), not just whether things appear square or
        round, and not just the many and endless merits of the ocean and
        mountains.
      </p>
      <p id="jpn">
        かたはらのみかくのごとくあるにあらず、直下も一滴もしかあるとしるべし。
      </p>
      <p id="eng">
        It is not just what&apos;s surrounding oneself; one must know
        what&apos;s directly beneath oneself and what&apos;s in a single drop of
        water.
      </p>
      <br />
      <p id="jpn">
        うを水をゆくに、ゆけども水のきはなく、鳥そらをとぶに、とぶといへどもそらのきはなし。
      </p>
      <p id="eng">
        A fish swims in the water, and no matter where it swims, there is no end
        to the water; a bird flies in the sky, and no matter where it flies,
        there is no end to the sky.
      </p>
      <p id="jpn">
        しかあれども、うをとり、いまだむかしよりみづそらをはなれず。{" "}
      </p>
      <p id="eng">
        However, from long ago until now, the fish and the bird do not leave the
        water or the sky.
      </p>
      <p id="jpn">只用大のときは使大なり。</p>
      <p id="eng">
        It&apos;s just that when the task is great, the use is great.{" "}
      </p>
      <p id="jpn">要小のときは使小なり。</p>
      <p id="eng">When the need is small, the use is small.</p>
      <p id="jpn">
        かくのごとくして、頭頭に邊際をつくさずといふ事なく、處處に踏翻せずといふことなしといへども、鳥もしそらをいづればたちまちに死す。
      </p>
      <p id="eng">
        And just like that it can be said that each one covers its entire realm
        and that every single spot is tread upon; if the bird leaves the sky, it
        immediately dies.
      </p>
      <p id="jpn">魚もし水をいづればたちまちに死す。 </p>
      <p id="eng">If the fish leaves the water, it immediately dies. </p>
      <br />
      <p id="jpn">以水為命しりぬべし、以空為命しりぬべし。 </p>
      <p id="eng">
        One must know that from the water there is life, and one must know that
        from the sky there is life.
      </p>
      <p id="jpn">以鳥為命あり、以魚為命あり。 </p>
      <p id="eng">
        From the bird there is life, and from the fish there is life.{" "}
      </p>
      <p id="jpn">以命為鳥なるべし、以命為魚なるべし。 </p>
      <p id="eng">
        From life there must be the bird, and from life there must be the fish.
      </p>
      <br />
      <p id="jpn">このほかさらに進歩あるべし。 </p>
      <p id="eng">There is even more progress beyond this.</p>
      <p id="jpn">修証あり、その寿者命者あること、かくのごとし。 </p>
      <p id="eng">
        One&apos;s life and days, practice, revelation, they are all like this.
      </p>
      <p id="jpn">
        しかあるを、水をきはめ、そらをきはめてのち、水そらをゆかんと擬する鳥魚あらんは、水にもそらにもみちをうべからず、ところをうべからず。
      </p>
      <p id="eng">
        However, if after reaching the end of the water or the end of the sky,
        the bird or fish tries to move further, no further road nor place arises
        in the water or in the sky.
      </p>
      <p id="jpn">このところをうれば、この行李したがひて現成公案す。 </p>
      <p id="eng">
        If one reaches this place, one follows this path; this is the Genjo Koan
        (statement on becoming the present).
      </p>
      <p id="jpn">このみちをうれば、この行李したがひて現成公案なり。 </p>
      <p id="eng">
        If one reaches this road, one follows this path; this is the Genjo Koan.
      </p>
      <p id="jpn">
        このみち、このところ、大にあらず小にあらず、自にあらず他にあらず、さきよりあるにあらず、いま現ずるにあらざるがゆゑに、かくのごとくあるなり。
      </p>
      <p id="eng">
        This road, this place, it&apos;s neither great nor small; it&apos;s
        neither self nor other; it does not come from the past; it is not
        arising in the present; it is just like this.
      </p>
      <br />
      <p id="jpn">
        しかあるがごとく、人もし仏道を修証するに、得一法通一法なり、遇一行修一行なり。
      </p>
      <p id="eng">
        While things are like this, if a person practices and reveals the
        Buddhist path, attaining the path is surpassing the path, and reaching a
        step is practicing the step.
      </p>
      <p id="jpn">
        これにところあり、みち通達せるによりてしらるるきはの、しるからざるは、このしることの、仏法の究尽と同生し、同参するゆゑにしかあるなり。
      </p>
      <p id="eng">
        The place is in this: as one grows proficient on the road, knowledge
        progresses and knowledge halts; and as one masters the Buddhist path,
        this knowledge simultaneously arises and passes away.
      </p>
      <p id="jpn">
        得処かならず自己の知見となりて、慮知にしられんずるとならふことなかれ。
      </p>
      <p id="eng">
        What is attained and lost is certainly unknown and unconsidered by
        one&apos;s self.
      </p>
      <p id="jpn">
        証究すみやかに現成すといへども、密有かならずしも現成にあらず、見成これ何必なり。
      </p>
      <p id="eng">
        While it&apos;s said that the proof immediately becomes present (genjo),
        the secret certainly does not become present (genjo); this much for sure
        is seen.
      </p>
      <br />
      <p id="jpn">麻浴山宝徹禅師、あふぎをつかふ。</p>
      <p id="eng">Zen master Hotetsu of Mt. Mayoku was using a fan.</p>
      <p id="jpn">
        ちなみに、僧きたりてとふ、「風性常住、無処不周なり。
        なにをもてか、さらに和尚あふぎをつかふ？」。
      </p>
      <p id="eng">
        A passing monk came up and said, “The nature of wind is permanent, with
        neither source nor perimeter. What are you carrying? Teacher, why do you
        use a fan?”
      </p>
      <p id="jpn">
        師いはく、「なんぢただ風性常住をしれりとも、いまだ「ところとしていたらずといふことなき道理」をしらず」と。
      </p>
      <p id="eng">
        The master said, “While you know that the nature of wind is permanent,
        you don&apos;t yet know the meaning of &lsquo;there is no place it does
        not reach.&rsquo;”
      </p>
      <p id="jpn">
        僧いはく、「いかならんかこれ「無処不周底」の道理？」。
        ときに、師、あふぎをつかふのみなり。
      </p>
      <p id="eng">
        When the monk said, “Well then, what is the meaning of &lsquo;without
        source, perimeter, or base&rsquo;?” the master just kept using the fan.
      </p>
      <p id="jpn">僧、礼拝す。 The monk bowed. </p>
      <br />
      <p id="jpn">仏法の証験、正伝の活路、それかくのごとし。 </p>
      <p id="eng">
        The proof of the Buddhist path and the correctly transmitted way of life
        are like this.
      </p>
      <p id="jpn">
        「常住なればあふぎをつかふべからず、つかはぬをりもかぜをきくべき」といふは、常住をもしらず、風性をもしらぬなり。
      </p>
      <p id="eng">
        Saying, “If the nature of the wind is permanent, you shouldn&apos;t use
        a fan, or without one, you can still feel the wind,” is to misunderstand
        permanence and to misunderstand the nature of the wind.
      </p>
      <p id="jpn">
        風性は常住なるがゆゑに，仏家の風は，大地の黄金なるを現成せしめ，長河の蘇酪を参熟せり。
      </p>
      <p id="eng">
        Because the nature of the wind is permanent, Buddhists&apos; wind brings
        forth (causes to become present, genjo) gold from the wide earth and
        milk from the long river.
      </p>
      <br />
      <p id="jpn" style={{ fontStyle: "italic" }}>
        正法眼藏現成公案第一
      </p>
      <p id="eng" style={{ fontStyle: "italic" }}>
        The true teaching (correct path) revealed, Genjo Koan, number one
      </p>
      <p id="jpn" style={{ fontStyle: "italic" }}>
        これは天福元年中秋のころかきて，鎭西の俗弟子楊光秀にあたふ。
      </p>
      <p id="eng" style={{ fontStyle: "italic" }}>
        This was written in mid autumn of the first year of Tenpuku (1233) and
        given to my student You Koushuu of Kyuushuu (Chin-zei).
      </p>
      <p id="jpn" style={{ fontStyle: "italic" }}>
        建長壬子拾勒
      </p>
      <p id="eng" style={{ fontStyle: "italic" }}>
        Revised in the year of the water rat during Kenchou (1252)
      </p>
    </>
  );
};
