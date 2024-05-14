async function sprintChallenge5() { // Note the async keyword so you can use `await` inside sprintChallenge5
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇

  // 👇 ==================== TASK 1 START ==================== 👇

  // 🧠 Use Axios to GET learners and mentors. // http://localhost:3003/api/...
  // ❗ Use the variables `mentors` and `learners` to store the data.
  // ❗ Use the await keyword when using axios.

    let res1 = await axios.get('http://localhost:3003/api/mentors')
    let res2 = await axios.get('http://localhost:3003/api/learners')
  
    let mentors = res1.data 
    let learners = res2.data
    console.log(mentors)
    console.log(learners)

  // 👆 ==================== TASK 1 END ====================== 👆

  // 👇 ==================== TASK 2 START ==================== 👇

  // 🧠 Combine learners and mentors.
  // ❗ At this point the learner objects only have the mentors' IDs. // learners.mentors array only gives mentorId(s)
  // ❗ Fix the `learners` array so that each learner ends up with this exact structure:
    // {
  //   id: 6,
  //   fullName: "Bob Johnson",
  //   email: "bob.johnson@example.com",
  //   mentors: [
  //     "Bill Gates",
  //     "Grace Hopper"
  //   ]`
  // }

  /**
   * create a function to get the mentor ids to return mentor first name and mentor last name
   * then create a function for learner mentor combo (probably map)
   * ---> map over the learners array to create a new array that will inject the previous function's mentor names into learners.mentors array
   */
  function mentorIdToName(mentorID, mentors){
    const mentor = mentors.find(mentor => mentor.id === mentorID)
    console.log(mentor)
    return `${mentor.firstName} ${mentor.lastName}`
  }
  const learnerMentorCombo = learners.map(learner => {
    return { ...learner, mentors:
      learner.mentors.map(mentorID => mentorIdToName(mentorID, mentors))
    }
  })
  console.log(mentorIdToName)
  console.log(learnerMentorCombo)

  // 👆 ==================== TASK 2 END ====================== 👆

  const cardsContainer = document.querySelector('.cards')
  const info = document.querySelector('.info')
  info.textContent = 'No learner is selected'


  // 👇 ==================== TASK 3 START ==================== 👇

  for (let learner of learners) { // looping over each learner object

    // 🧠 Flesh out the elements that describe each learner
    // ❗ Give the elements below their (initial) classes, textContent and proper nesting.
    // ❗ Do not change the variable names, as the code that follows depends on those names.
    // ❗ Also, loop over the mentors inside the learner object, creating an <li> element for each mentor.
    // ❗ Fill each <li> with a mentor name, and append it to the <ul> mentorList.
    // ❗ Inspect the mock site closely to understand what the initial texts and classes look like!

    const card = document.createElement('div')
    card.classList.add('card')
    // card.classList.toggle('Selected')

    const heading = document.createElement('h3')
      heading.textContent = `${learner.fullName}` // `, ID ${learner.id}` not needed
      card.appendChild(heading)

    const email = document.createElement('div')
      email.textContent = `Email: ${learner.email}`
      card.appendChild(email)

    const mentorsHeading = document.createElement('h4')
      mentorsHeading.classList.add('closed')
      mentorsHeading.textContent = "Mentors"
      card.appendChild(mentorsHeading)

    const mentorsList = document.createElement('ul')
      for (let mentorID of learner.mentors) {
        const mentor = mentors.find(mentor => mentor.id === mentorID)
        const mentorName = document.createElement('li')
        mentorName.textContent = `${mentor.firstName} ${mentor.lastName}`
        mentorsList.appendChild(mentorName)
        console.log(learner.mentors)
      }
      // I'll need to figure a way to create a more efficient way to not repeat the const mentor from the mentorIdToName function
      // Or better yet let there be a variable with that allows it to be put into the function and the mentorList...hmm
      // Should be simple, but... it just not coming to me...overthinking it or I'm just done with continuing, lol.
    
    
    
    
    // 👆 ==================== TASK 3 END ====================== 👆

    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    card.appendChild(mentorsList)
    card.dataset.fullName = learner.fullName
    cardsContainer.appendChild(card)

    card.addEventListener('click', evt => {
      const mentorsHeading = card.querySelector('h4')
      // critical booleans
      const didClickTheMentors = evt.target === mentorsHeading
      const isCardSelected = card.classList.contains('selected')
      // do a reset of all learner names, selected statuses, info message
      document.querySelectorAll('.card').forEach(crd => {
        crd.classList.remove('selected')
        crd.querySelector('h3').textContent = crd.dataset.fullName
      })
      info.textContent = 'No learner is selected'
      // conditional logic
      if (!didClickTheMentors) {
        // easy case, no mentor involvement
        if (!isCardSelected) {
          // selecting the card:
          card.classList.add('selected')
          heading.textContent += `, ID ${learner.id}`
          info.textContent = `The selected learner is ${learner.fullName}`
        }
      } else {
        // clicked on mentors, we toggle and select no matter what
        card.classList.add('selected')
        if (mentorsHeading.classList.contains('open')) {
          mentorsHeading.classList.replace('open', 'closed')
        } else {
          mentorsHeading.classList.replace('closed', 'open')
        }
        if (!isCardSelected) {
          // if card was not selected adjust texts
          heading.textContent += `, ID ${learner.id}`
          info.textContent = `The selected learner is ${learner.fullName}`
        }
      }
    })
  }

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`
}

// ❗ DO NOT CHANGE THIS CODE. WORK ONLY INSIDE TASKS 1, 2, 3
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
