additional# D3 Project - Data Journalism and D3

![Newsroom](https://media.giphy.com/media/v2xIous7mnEYg/giphy.gif)

## Background

The U.S. Census Bureau and the Behavioral Risk Factor Surveillance System are great sources of information about our nation, that can help us understand some current and future challenges, faced by our nation.

In this project, recent ACS 1-year (American Community Survey) estimates from 2014 are scrutinized - specifically data (`data.csv`) on rates of income, obesity, poverty, etc. by state. MOE stands for "margin of error."

By harnessing the power of JavaScript (specifically utilizing `d3.js`) I hope to uncover the health risks facing particular demographics of Americans, <b>by means of an interactive scatter plot</b>

### Before I Began

1. Created a new repository for this project called `D3-challenge`.

2. Cloned the new repository to my computer.

3. Inside the local git repository, I created a directory for the D3 challenge. Use the folder name to correspond to the project: **D3_data_journalism**.

4. This project utilizes both **html** and **Javascript** so be sure to add all the necessary files. With the `index.html` file being the framework to illustrate my findings.


## My Method

### My Core Objective: D3 Dabbler

![core-chart](Images/completed_core_chart.png)

I primarily created a `d3.js` scatter plot between two of the data variables. In this case I wanted to plot `Healthcare vs. Poverty`

Using the D3 techniques, I created a scatter plot that represents each U.S state with circle elements. I coded this graphic in the `app.js` file of my `d3-challenge repo`, by pulling in the data from `data.csv` by using the `d3.csv` function. The bi-product of this effort if the above image, which included -

* State abbreviations in the circles.

* Created and situated the axes and labels to the left and bottom of the chart.

* Testing / Run method: I utilized `python -m http.server` to run the visualization. This hosted on the page at `localhost:8000` in my web browser.

- - -

### Taking it a step further (plotting all variables interactively)

Rather than plotting several standalone charts in a Dashboard, as a method of comparison, I decided to harness the power of `d3.tip` to include all demographic and risk factors. I did this by -

* Placing additional labels in the scatter plot, that are interactive by means of `click events`, thus enabling a decision on which data to dynamically display. For enhanced aesthetics, the circles were implemented with animated transitions by taking the circles' locations and axes ranges.

![7-animated-scatter](Images/7-animated-scatter.gif)

#### 1. More Data, More Dynamics

You're going to include more demographics and more risk factors. Place additional labels in your scatter plot and give them click events so that your users can decide which data to display. Animate the transitions for your circles' locations as well as the range of your axes. Do this for two risk factors for each axis. Or, for an extreme challenge, create three for each axis.

* Hint: Try binding all of the CSV data to your circles. This will let you easily determine their x or y values when you click the labels.

#### 2. Incorporate d3-tip

While the ticks on the axes allow us to infer approximate values for each circle, it's impossible to determine the true value without adding another layer of data. Enter tooltips: developers can implement these in their D3 graphics to reveal a specific element's data when the user hovers their cursor over the element. Add tooltips to your circles and display each tooltip with the data that the user has selected. Use the `d3-tip.js` plugin developed by [Justin Palmer](https://github.com/Caged)—we've already included this plugin in your assignment directory.

![8-tooltip](Images/8-tooltip.gif)

* Check out [David Gotz's example](https://bl.ocks.org/davegotz/bd54b56723c154d25eedde6504d30ad7) to see how you should implement tooltips with d3-tip.

- - -

### Assessment

Your final product will be assessed on the following metrics:

* Creation of a **new** repository on GitHub called `D3-Challenge` (note the kebab-case). Do not add to an already existing repo.

* Completion of all steps in the core assignment

* Coherency of scatter plot (labels, ticks)

* Visual attraction

* Professionalism

**Good luck!**

### Copyright

Trilogy Education Services © 2019. All Rights Reserved.
