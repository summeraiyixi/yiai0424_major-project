# yiai0424_major-project


## Instructions

The work utilizes **Perlin noise and random values** to drive animation of ''Apple Tree''. 

The overall design concept follows the inspiration of a group project, demonstrating the natural growth process of an apple as it grows, matures, and eventually falls over time. The passage of time is expressed through changes in the background and the color of the apple. 

*( *Please note that the artwork does not require interaction to observe the apple's generation process )*

## Animation and difference

The biggest difference between my work and that of my teammates is that nearly all elements in my piece are animated. 
- For example, the background, the position of the apple, and the color of the apple. 
- Additionally, as the window is resized, my work adjusts accordingly and restarts the animation behavior.

## Technical interpretation

### Setup
- **windowResized():** Adjusts canvas size and reinitializes elements.

### Drawing:
- **draw():** Continuously called to render the frame, updating and drawing elements.
- **drawCanvas():** Draws background, oil painting effect, roots, bottom rectangle, branches, and trunk apple.

### Initialization:

- **initializeAll():** Clears and reinitializes apples and branches.
- **initializeBranches():** Creates branches and adds apples.
- **initializeBottomRectApples():** Places apples in the bottom rectangle.
- **initializeTrunkApple():** Creates a single trunk apple.

### Classes:

- **Branch:** Manages branch drawing and apples.
- **Apple:** Handles apple growth, falling, and drawing

### Perlin Noise:

- Perlin noise is utilized in the **Apple class** to simulate natural growth of the apples. Specifically, it's used in the update method of the Apple class.
- noise is a function that generates Perlin noise, and **this.noiseOffset** is used to drive the noise over time.


### Random Values:

- Random values are used extensively throughout the code to determine various properties such as positions, colors, sizes, and growth rates.
- Functions like **random()**  and **lerp()** (linear interpolation with random values) are used for creating randomness in positions and other properties.


## Change of code
- Most changes in branch class and apple class

* But there are other minor changes. I've labelled them all clearly in the comment

* - If the form of the comment is like this, 

![added](readImages/added.jpg)

![end](readImages/end.jpg)

* - it proves that the code after this comment or between the two comments is newly changed by me