const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)

}


function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
     text: 'You are woken up at midnight by a strange noise.',
    options: [
      {
        text: 'Investigate the noise',
        nextText: 2
      },
      {
        text: 'Call for your dog',
        nextText: 3
      }
    ]
  },
  {
    id: 2,
    text: 'You decided to look out of the window to find the source of the noise and you see your dog barking at something.',
    options: [
      
      {
        text: 'Go to Front door',
        nextText: 4
      }
    ]
  },
  {
    id: 3,
    text: 'You called for your dog but got no response. ',
    options: [
      {
        text: 'Look out of the Window',
        nextText: 2
      }

    ]
  },
  {
    id: 4,
    text: "You run to the front door but you couldn't stop your dog from running away, chasing something in the darkness.",
    options: [
      {
        text: 'Go after your Dog.',
        nextText: 6
      },
      
      {
        text: 'Wait for him to come back.',
        nextText: 5
      }
    ]
  },
  {
    id: 5,
    text: 'You waited for your dog to comeback for sometime but there is no sign of him ',
    options: [
      {
        text: 'Go after your Dog.',
        nextText: 6
      }
    ]
  },
  {
    id: 6,
    text: 'You decided to go after your Dog, You must take something with you that might be helpful. What will you take',
    options: [
      {
        text: 'Baseballbat',
        nextText: 7
      },
      {
        text: 'Gun',
        nextText: 9
      },
      {
        text: 'Deodrant',
        nextText: 10
      }
    ]
  },
  {
    id: 7,
    text: 'There might be Dangers out there so you took Baseballbat.',
    options: [
      {
        text: 'Veture Forth',
        setState: {Bat:true},
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: "It's dark outside so you took a Torch.",
    options: [
      {
        text: 'Veture Forth',
        setState: {Torch:true},
        nextText: 11
      }
    ]
  },
  {
    id: 9,
    text: "You don't know what kind of dangers are out there so just to be safe you took a Gun.",
    options: [
      {
        text: 'Veture Forth',
        setState: {Gun:true},
        nextText: 11
      }
    ]
  },
  {
    id: 10,
    text: 'For some reason you took a Deodrant.',
    options: [
      {
        text: 'Veture Forth',
        setState: {Deo:true},
        nextText: 11
      }
    ]
  },
  {
    id: 11,
    text: "It's Dark and cold outside, After walking for sometime there's a deadend to your path You can either take left to the cliffs or right towards the Canal. ",
    options: [
      {
        text: 'Take Left',
        nextText: 12
      },
      {
        text: 'Take Right',
        nextText: 13
      }
    ]
  },
    {
      id: 12,
      text:"You decided to go towards the cliffs after walking for sometime, You came across a well dressed man. after seeing you he asks for your help.",
      options: [
        {
          text:'Ignore him',
          nextText: 16
        },
        {
          text: 'Help him',
          nextText: 14
        }
      ]
    },
    {
      id: 14,
      text:"The stranger says that he's lost and needs the direction towards the roads. As you went closer to him, out of nowhere he pulls out a Knife and threatens you for money.",
      options:[
        {
          text:'Run!!!',
          nextText: 15
        },
        {
          text:'Hit him with bat',
          requiredState: (currentState) => currentState.Bat,
          nextText: 17
        },
       

        {
          text:'Scare him with Gun',
          requiredState: (currentState) => currentState.Gun,
          nextText: 19

        },
        {
          text:'Spray Deodrant in his face',
          requiredState: (currentState) => currentState.Deo,
          nextText: 20

        }
       ]
    },
    {
      id: 15,
      text:"Seeing the Knife, You tried to run but he grabbed you from back and stabbed you in chest.  YOU ARE DEAD ",
    options:[
      {
        text:'Restart',
        nextText: -1
      }
    ]
    },
    {
      id: 17,
      text:"Seeing the Knife, You immediately hit him with bat in the face and ran towards a safe distance. Luckily he didn't follow you ",
    options:[
      {
        text:'Go ahead',
        nextText: 16
      }
    ]
    },
    {
      id: 18,
      text:"Seeing the Knife, You flashed the torch in his face distracting him, You ran to safe distance. Luckily he didn't follow you ",
    options:[
      {
        text:'Go ahead',
        nextText: 16
      }
    ]
    },
    {
      id: 19,
      text:"Seeing the Knife, You pull out your gun which scared the man making him run in the opposite direction. ",
    options:[
      {
        text:'Go ahead',
        nextText: 16
      }
    ]
    },
    {
      id: 20,
      text:"Seeing the Knife, You sprayed Deodrant in his eyes, distracting him you ran towards a safe distance. Luckily he didn't follow you",
    options:[
      {
        text:'Go ahead',
        nextText: 16
      }
    ]
    },
    {
      id: 13,
      text:"You decided to go towards the canal after walking for sometime, You came across a poorly dressed old man. It looks like he's searching something.",
      options: [
        {
          text:'Ignore him',
          nextText: 16
        },
        {
          text: "Help him",
          nextText: 21
        },
        {
          text:'Shoot him',
          requiredState: (currentState) => currentState.Gun,
          nextText: 22

        }
      ]
    },
    {
      id: 22,
      text:"WHAT!!!!! Why would you wanna do that? He's just some random old guy, Why would you wanna murder him. GAME IS OVER FOR YOU SIR!",
      options:[{
        text:"Restart",
        nextText:-1
      }
  
      ]
    },
    {
      id: 21,
      text:"You asked if he's OK, he explained that he's dropped his medicines and is searching for it ",
      options:[
        {
          text: "Help him ",
          nextText:23
        },
        {
          text: "Ignore him and move forward",
          nextText: 16
        }
      ]
    },
    {
      id:23,
      text:"You decided to help him search for his medicines and you found them very quickly. Being happy with your generousity Old man offered you a box of matchsticks.",
      options:[
        {
          text: "Take matchsticks",
          setState: {Matchsticks:true},
          nextText: 24
        },
        {
          text: "Refuse it",
          nextText: 25
        }
      ]

    },{
    id:24,
    text: "It's cold and dark so you accept the Matchsticks as it might be useful.",
    options:[
      {
        text:"Go ahead",
        nextText:16
      }
    ]
    },
    {id:25,
    text: "You thought that the gift is useless so you refused to take it",
    options:[
      {
        text:"Go ahead",
        nextText:16
      }
      ]
    },
    {
      id:16,
      text:"You walked furthur and found your Dog's collor at the opening of a cave. You know he's inside it.",
      options:[
        {
          text:"call for him",
          nextText:26
        },
        {
          text:"Go inside",
          nextText:27
        },
      ]
    },
    {
      id:26,
      text:"You called for him but there's no sign of him",
      options:[
        {
          text:"Go inside",
          nextText:27
        },
        {
          Text:"Use Deodrant",
          requiredState: (currentState) => currentState.Deo,
          nextText:28
        }

      ]
    },
    {
    id:28,
    text:"You sprayed deodrant around so that it's smell might attract your dog but few moments later a wolf caught it's sent and attacked you. YOU DIED!!!",
    options:[
      {
        Text:"Restart",
        nextText:-1
      }
    ]
    },
    {
      id:27,
      text:"You decided to go inside the cave, It's pitch black inside You can't see anything",
      options:[
        {
          text:"Keep moving forword",
          nextText:29
        }
      ]
    },
    {
      id:30,
      text:"You turned on your torch and now you can properly see inside the cave. After moving a little forward you see a wolf crawling towards you",
      options:[
        {
          Text:'Stand Still',
          nextText:40
        },
        {
          Text:'Run!!!',
          nextText:35
        },
        {
          Text:'Fire Gun',
          requiredState: (currentState) => currentState.Gun,
          nextText:41

        },
        {
          Text:'Hit him with Bat',
          requiredState: (currentState) => currentState.Bat,
          nextText:42
        }

      ]
    },
    {
      id:29,
      text:"You continued to move forward in pitch black and then suddenly a creature came running towards you! ",
      options:[
        {
          text:"Run!!!!!!",
          nextText:32
        },
        {
          text:"Stand still",
          nextText:33
        },
        {
          text:"Hit it with bat",
          requiredState: (currentState) => currentState.Bat,
          nextText:37
        },
        {
          text:"Fire the Gun",
          requiredState: (currentState) => currentState.Gun,
          nextText:39
        }
      ]
    },
    {
      id:32,
      text:"You ran with every last bit of your energy but creature which now you can see is a Wolf grabbed your leg and dragged you further inside the cave YOU DIED",
      options:[
        {
          Text:"Restart",
          nextText:-1
        }
      ]
    },
    {
      id:33,
      text:"You stood as still as you could while the creature which now you can see is a wolf circles around you",
      options:[
        {
          text:"Slowly move away",
          nextText:34
        },
        {
          text:"Run!!!!",
          nextText:35
        }
      

      ]
    },
    {
      id:34,
      text:"You slowly move away from it and exit the cave on the way back you found your dog standing near his collar",
      options:[
        {
        text:"Go home",
        nextText:36
        }
      ]
    },
    {
      id:36,
      text:"Your dog looks injured so you carry him on your hand and head towards your home. THE END (Restart the game to see other endings)",
      options:[
        {
          text:"Restart",
          nextText:-1
        }
      ]
    },
    {
      id:35,
      text:"You ran with every last bit of your energy but Wolf grabbed your leg and dragged you further inside the cave. YOU DIED",
      options:[
        {
          Text:"Restart",
          nextText:-1
        }
      ]
    },
    {
      id:37,
      text:"With every last bit of your energy you hit the creature with the bat and as the creature screamed your heart felt with regret. The creature was actually your Dog and you couldn't see him in dark.",
      options:[
        {
          text:"Take him home",
          nextText:38
        }

      ]
    },
    {
      id:38,
      text:"You carried your Dog in your arms and walked towards your home feeling a little guilty. THE END (Restart the game to see other endings)",
      options:[
        {
          Text:"Restart",
          nextText:-1
        }
      ]
    },
    {
      id:39,
      text:"Before the creature could come near you, You shot the creature. Because of muzzle flash you could actually see who was the creature, It was actually your Dog. YOU KILLED YOUR DOG!",
    options:[{
      Text:'Restart',
      nextText:-1
    }
    ]
    
    },
    
   
    {
      id:40,
      text:"You stood as still as you could while the wolf circles around you",
      options:[
        {
          text:"Slowly move away",
          nextText:34
        },
        {
          text:"Run!!!!",
          nextText:35
        }
      

      ]
    },
    {
      id:41,
      text:"You fired the gun but it missed the Wolf and it attcked you. YOU DIED",
      options:[
        {
          Text:"Restart",
          nextText:-1
        }
      ]
    },
    {
      id:42,
      text:"You hit the wolf with your bat but it made him even more angry and it attacked you. YOU DIED",
      options:[
        {
          Text:"Restart",
          nextText:-1
        }
      ]
    },
    {
      id:31,
      text:"You fire a matchstick and now you can properly see inside the cave. After moving a little forward you see a wolf crawling towards you",
      options:[
        {
          Text:"Stand Still",
          nextText:40
        },
        {
          Text:"Run!!!",
          nextText:35
        },
        {
          Text:"Fire Gun",
          requiredState: (currentState) => currentState.Gun,
          nextText:41

        },
        {
          Text:"Hit him with Bat",
          requiredState: (currentState) => currentState.Bat,
          nextText:42
        }

      ]
    }




  ]
startGame()