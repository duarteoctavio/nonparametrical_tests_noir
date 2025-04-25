# Making scientifical research better: Noir Verifiers for Non Parametrical Tests

  Recently, the problems of scientifical research, validation, publicacion and diffusion have become increasingly evident to the general public.

  This project aims to fix some of this problems using crypto technology in an incremental approach, offering a powerful toolset to build trust both to the inside of the research community and with the rest of society.


## Why is this useful

  I attach [this interesting article](https://www.chjh.nl/concerns-about-blockchain-for-science/). The interesting part about it is it highlights important current issues and challenges. Even though the author is *against* the hypothesis that blockchain relatad tools can help fix the issue, I believe we are able to address several of the issues he mentions if ZK and some other current blockchain related concepts are considered.

""""
What i care about is this list of problems he considers most relevant.

- Selective publication.
- **Misrepresentation of the research process (e.g., adjusting predictions after data are available)**.
- Limited, obfuscated, and unequal access to results.
- Messy and restricted preservation.
- Exclusivity of (participating in) scientific research.
- Inequality in research.
- Toxic research evaluations.
""""

  To this list of issues, I will add the very inefficient and greedy monopoly of a fairly small set of publishers, who traditionally ask reviewers to work for free and publishers to pay to be published, as well as the readers to get access to the articles. A monopoly hurting all participants in a system is always a good chance for new alternatives to attract attention, while still having a profit, just more reasonable.

  I believe there's space to maneuver around most of these issues, as reviewing can be probably improved using semaphores and blockchains offer a several ways to increase persistence, availability and accesibility to publish/emit data (being p2p systems).

  I will focus on the *second* one, as you might have guessed because of the boldening. and the following section's title.

  I'm listing the other problems **Chris Hargerink** mentions because I envision this first project as part of a suite that has the ambitious target of offering solutions for all of these problems, while allowing the reasonable practices to be preserved and improved.


## How to stop the *misrepresentation of research processes*

  A ZK contract can do two things to stop this from happening:
  - Level A: The data can  be stored on chain, where the tests and data processing are run by smart contracts aggreed beforehand, above all *before the data is captured*. This is farily feasible, as in fact most of this tests are standard practices, highly repetitive among projects.
  - Level B: The data can be totally hidden even from the researchers if it is obtained by a neutral third party following their instructions (even crowds, as mentioned below for donated health data).


### A simple example

  Albert is a researcher who wants to prove a constant he fond about solar activity.

  Since the Sun is widely observed by many labs, there's no risk he could produce fake data or manipulate what's existing. Nonetheless, when he published his first results, some colleagues suspected he didn't have a hypothesis and he just grabbed something that fittted past observed numbers reasonably well.

  This time, Albert wants a full proof of his research integrity: He will publish a smart contract on the blockchain that will acquire the data day to day and when the amount of samples is reached, will perform a preestablished statistical test that he commited to beforehand, and measure success by a fixed criteria that he informed from day 0.

  This time, nobody will be able to question Albert's methodology.

  The important part here is the ability to validate a calculation and it's results. Next example also profits on anonimity.


### A more complex example

  Alice is a researcher who believes she and her team have found a product that increases tomato yield. She calls it **tomacco**.

  Bob is a tomato producer and wants to increase his yields, but since Alice's product has a cost, he needs to be reasonably sure **tomacco** will give him enough extra tomattos to justify the increased costs by buying and applying it.

  Alice wants to show Bob she is totally transparent, so she hires Cameron's company. Cameron does crop testing on demand. Alice will only provide a sample of **tomacco** as well as usage instructions to Cameron. Alice, Bob and Cameron will agree on how to define an experiment that correctly represents real production field conditions. They will also agree on how success is measured.

  To measure success, they will choose a suitable statistical test. In this case, they will compare the well known median tomato yield from Cameron's preexisting experiments, and compare it with the **tomacco** exposed crops using a non parametrical Wilcoxon test. If the test validates that the yield is bigger with reasonable statistical power, Bob will but a lot of **tomacco** from Alice.

  Bob is certain Alice isn't cheating, as she is not controlling the crops, and the success criteria has been defined *beforehand*, it can't be tampered to make the data look better without Bob and Cameron realizing it.

  Alice, Bob and Cameron might still agree that the chosen process wasn't right for some reason and agree on a slightly different criteria, but they won't be able to do that without informing it, as a first form of the experiment was commited and stored on the chain, and manipulated dataset will be able to satisfy the same ZK proofs and pretend to be the original.

  Dwight, a reviewer from a University who doens't know Alice, Bob or Cameron, might see their publication about what they found, and he might agree with the first or second criteria, but above all he will be sure that he knows how the experiment looked when it was first conceived and any manipulation to the data or success criteria is explicit.

## An immediate extra benefit: Crowdsourced sensitive data

  The ability to submit data while remaining anonimous opens the door to be able to ask people for their data without creating riks for them.
  A good excample is medical research data. Almost all medical data is delicate and probably nobody would share it willingly because it reveals too much about a person's life, weaknesses, etc.
  This data is of an enormous value, though, and in fact there's a huge benefit in sharing your data: you allow researchers to work on a case similar to yours: yourself.
  Most medical science big data is heavily privatized, acquired by fairly dubious methods from the patients and fragmentary, as once you missapropriate a patients data, which is a crime, you can't approach and politely ask for the missing details.
  Zero knowledge anonimized medical data submission could be a game changer for science.


## Why non parametrical tests, in particular?

- Nonparametrical tests are tests that only assume **minimal hypotheses** about the test data. They don't even ask for it to be normally distributed. This makes them way more applicable to way more problems, without the need to test for distributional hypotheses beforehand, being both cheaper and easier to interpret.

- The Wilcoxon test first encodes the data as **ordinal scores**, which adds a further level of both *anonimization* and *simplification**.

- The calculations are **reasonably cheap** to validate, requiring less use of real numbers/floats.

- The **involved maths are pretty** and slightly unusual, which combines with zero knowledge.


# Plan

## Stage 0: Preliminar Research

- Done.

## Stage 1: Code the provers

- This is 75% done.

## Stage 2: Code the contracts.

- This is 50% done, but might be less.

## Stage 3: Tie contracts and a nice frontend to show an MVP application.


# Some related projects: State of the art.

- [https://www.protocols.io/](Protocols) is a service roughly offering the same benefits, but without any strong warrants or zero knowledge, which in some of the mentioend application cases are transformative. Their continued existence, though, highlights the fact that there's a need for this kind of services.


# Some interesting articles.

- [Cited above, about main issues and challenges:](https://www.chjh.nl/concerns-about-blockchain-for-science/) Challenges faced by current research and why basic blockchain technology wouldn't be good enough.
- [About replication and new USA policies](https://www.axios.com/2025/03/24/medical-studies-rfk-nih-replication) Shows there are opportunities for services aimed towards ensuring and validating transparency in research.
- [Example of controversial data doctoring](https://arstechnica.com/science/2024/07/alzheimers-scientist-indicted-for-allegedly-falsifying-data-in-16m-scheme/) This was a resounding situation in which data was doctored to manipulate results.
