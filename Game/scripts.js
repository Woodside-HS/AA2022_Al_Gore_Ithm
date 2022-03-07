function Scripts(){

}

Scripts.currentLevelScripts = function(currentLevel){
  let levelScripts = [
      [ // level 1 "intro" scripts
        "Mr. President! It's time for your reelection campaign. Your approval rating is only 40%, so it'll be tricky to get reelected.",
        "Since your approval rating is so low, you'll have some serious challenges in the Democratic Primary.",
        "Your main opponent is senator John Kerry from Massachusetts. If you can beat him handily in the Iowa caucus, it'll be clear that you're fit to be our Democratic nominee. Your approval rating will likely increase, too!",
        "Use the \"w,\" \"a,\" \"s,\" and \"d\" keys to move around this Iowa neighborhood to campaign there. Hold down the mouse to shoot at Kerry and the other Democrats. If you can defeat them or gain powerups, your approval rating will increase!"
      ],

      [ // level 2 scripts
        "After your staggering victory in Iowa, you soar to the Democratic nomination. Now it's just you against the Republicans.",
        "First, you need to deal with Sean Hannity at Fox News. He's trying to run a story on an allegation of a past affair of yours. This could seriously damage your campaign if you don't deal with him immediately. Good luck!"
      ],

      [ // level 3 scripts
        "Ahead of the Republican Primaries, former Vice President Dan Quayle has made a comeback and is attempting to undermine your campaign. You'll need to defeat him by throwing potatoes at him to confuse him."
      ],

      [ // level 4 scripts
        "Former Secretary of Defense Dick Cheney is calling upon you to declare war on Iraq following the November 9th attacks.",
        "You can't afford to start a war at this critical point in your campaign, but the majority of Congress and the American people support it. Your job is to convince them not to go to war while keeping your approval rating high enough to be reelected."
      ],

      [ // level 5 scripts
        "Former Texas governor George W. Bush landed the Republican Nomination for this election. Even though you barely beat him in 2000, he's polling better than you at the moment.",
        "First, you'll need to outperform the Dubbya at the first of three Presidential debates. This one is about domestic policy, so you've got the upper hand in this one."
      ],

      [ // level 6 scripts
        "After winning the first debate, it's time for the second Presidential debate. This one's focused on foreign policy, where you're polling low after refusing to go to war in Iraq."
      ],

      [ // level 7 scripts
        "If you can win this last town hall debate, you'll have the advantage going into the election. However, the American people see you as disconnected and unsympathetic, so you'll need to do really well here to overcome the low expectations of the American people."
      ],

      [ // level 8 scripts
        "It's election day! After making it through the debates, you need to hold off George W. Bush until the results come in. Good luck!"
      ],

      [ // level 9 scripts
        "Congratulations! You have been reelected President of the United States of America!"
      ]
    ];
  for(let i=0;i<levelScripts[currentLevel].length;i++){
    alert(levelScripts[currentLevel][i]);
  }
}

Scripts.generateRandomEvent = function(enemyName){
  let listOfGaffes = [
    "\"Poor people can be just as successful as white people.\"",
    "\"I believe that man and fish can coexist peacefully.\"",
    "\"I know how hard it can be to put food on your family.\"",
    "\"Rarely is the question asked: is our children learning?\"",
    "\"You cannot go to a 7-Eleven or a Dunkin' Donuts unless you have a slight Indian accent.\"",
    "\"Folks, I can tell you I've known eight presidents, three of them intimately.\"",
    "\"I gave you the internet and I can take it away.\"",
    "\"But I assure you, we will not let the glaciers win.\"",
    "\"My fellow Armenians\"",
    "\"\"",
    "\"\"",
    "\"\"",
  ];
  let deltaApproval = Math.floor(Math.random()*10);
  let positiveEvent = Math.random()>0.5;
  console.log(positiveEvent);
}
