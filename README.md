# keyframes.js
A functional animation library

## Book I: Motivation
Once upon a time there was a programmer, he discovered the ways of Tao at an early age, and he's been following them ever
since, knowing that he'll never achieve perfection, for only the Tao of Programming is perfect, but also knowing that the road
itself is the reward. And often that programmer needed an animation library, but alas, every one of them was filled with heresy
and filth, bad practice and monkey code leaking from every LoC. And so one time the programmer could not take it anymore,
in dispair, he cried:  

"Oh, the great Tao of programming! Indeed all things are possible within you, for you are perfection itself, indeed all the 
patterns exist within you, for patterns are your sacred body, indeed all the good practices flow within you, for good practices
are your holy blood, indeed all readability and reusability comes from you, for readability and reusablity are your divine
breath! But tell me, oh, Magnificient Tao, why have you forsaken the writers of animation libraries, why do they all suck?
It is for our sins! Without doubt it is because our defiance to write tests and comments and document our code that you
send us such punishment!"

And thus answered the Tao of programming:

"Do not despair, my child, for I have chosen you to write an animation library that will be the essense of my divine will!"

Humbled, the programmer fell unto his knees, and rasing his hands toward the bright light that was the Tao, he plead:

"Oh, merciful Tao! I am not worthy of such task! Surely I do not deserve to be the tool of your sacred plan!"

And so the Tao spoke:

"My child, you've been up all night, your body is tired from sleep deprivation, you're eyes are red from reading too much bad
code, and your mind is taunted from playing too much StarCraft! Go now, light the holy fire, and put a kettle upon it, and from
that kettle you shall pour yourself a very strong coffee, the drink of the gods! Let the sacred fluid of coffee flow inside
you, and you shall see!"

And thus he saw, drinking the divine ambrosia and staring into city lights, he saw!

##Book II: Introduction
In the beginning there was T, and there was S. And T was time, and S was state, and T was a set of real numbers from 0 to 1, 0 being the beginning of all things, and 1 the end of them. And S was the set of the possible CSS styles, all the combinations of CSS, CSS3 and even vendor specific properties existed within S. And from the fusion of T and S, there was a function of T upon S, f: T -> S.

"Behold!" a voice said, "For that function is the animation in its purest form!"

"But how can there be an animation with nothing to animate? And what use is the animation if it lasts an eternity?" doubted the programmer.

"Oh you of little faith! Shall you question me next what use is the Pythagorean theorem without a triangle to measure? Or the associative law without taxes to pay? Truly, those who cannot see beyond particularities walk the path of antipatterns, they shall never comprehend the Tao! But those who see beyond the lines of code, beyond the current project, those who see the universal abstraction, they walk the path of the righteous, and they shall achieve enlightment! For truly, as long as the faithful understands the abstraction, he shall find plenty of opportunities to implement it, but the sinner, he who is blind to the mathematical model, even after implementing MAX_INT isolated cases of it, shall not see the diamond beneath the facets!"

The programmer stood silent in awe, as the voice spoke thus:

"Behold! Let
```js
function rotate(t){
  var grades = 360 * t;
  return `transform: rotateX(${grades})`
}
```
Let d = 24!  
Let h equal the current hour!  
And there, by requestAnimationFraming
```js
rotate(h/d);
```
I have just made the Earth spin!"

And the Earth span, and there was Day and there was Night, and by the end of the Night the programmer was enlightened.

##Book III: Enlighment
"Behold! For this is the code of the righteous!"
```
npm install keyframes.js
```
```js
import * as K from "keyframes.js"
var fadeOut = K.property('opacity', 1, 0);
var blink = K.toAndFrom(fadeOut);
var blink4times = K.repeat(4, blink);
var blink4timesEased = K.easings.easeInOutExpo(blink4times);
K.animate(1000, document.getElementById('the-thing'), blink4timesEased)
```
##Book IV: The API of the righteous
"Use these tools, understand and accept them, as it is promised, he who does so will surely achieve enlightment!"
###tween(Object from, Object to)
Returns an animation that connects the from and to states
```js
var fadeOut = tween({
  opacity: 1
}, {
  opacity: 0
});

fadeOut(.25);//{opacity: .75}
fadeOut(.5);//{opacity: .5}
fadeOut(.75);//{opacity: .25}
```
###transition(String propertyName, intialValue, finalValue)
Connects two states of a single property. The example above could be written as:
```js
var fadeOut = transition('opacity', 1, 0)
```
###ensure(Object state)
Creates and animation that for any 0<t<1 returns the state passed as argument
###reverse(animation)
Returns an animation that is the reverse of the argument. Using the var _fadeOut_ from above:
```js
var fadeIn = reverse(fadeOut)
```
is the same as:
```js
var fadeIn = property('opacity', 0, 1);
```
or
```js
var fadeIn = tween({opacity: 0, opacity: 1})
```
###chain({t1: animation1, t2: animation2})
Creates a single animation from several subanimations that will be executed consecutively. Requires an object with float keys that indicate at what time(relative to the parent animation) the animation passed as value should run:
```js
var fadeOut = transition('opacity', 1, 0)
var fadeIn = reverse(fadeOut);
var blink = chain({
  0: fadeOut,
  .5: fadeIn
})
```
###toAndFrom(animation)
Will chain the animation with its reverse, the first animation will end and the second will start at .5. The example above could be written as
```js
var blink = toAndFrom(transition('opacity', 1, 0));
```
###repeat(times, animation)
Will chain the animation with itself _times_ times, **t** will be distributed evenly between all the subanimations, each one will consume 1/times of parent **t.**
###prerender(ms, animation)
Will map the animation as to run during _ms_ milliseconds(60 fps) and cache the result, will return a function that will return the result from that cache.
###stream(ms, animation, cb)
Will execute the animation in real time(using requestAnimationFrame) during _ms_ milliseconds, will call cb with the current state.
```js
stream(1000, transition('opacity', 1, 0.5'), state => console.log(state))//{opacity: 0.1}, {opacity: 0.2}, opacity{0.3}...
```
###Easings
```js
import {easings} from "keyframes.js"
```
or
```js
import * as easings from "keyframes.js/easings"
```
####ease(easingFunction, animation)
Will return an animation eased by _easingFunction._ Easing function takes the standard easings arguments:
```js
function(currentTime, totalTime, progressRatio, valueSoFar, change)
```
####Preset easing functions
The standard Robert Penner's easing formulas are available, use them like this:
```js
easeInQuad(animation)
```
####List of preset easing functions
* linear  
* easeInQuad  
* easeOutQuad  
* easeInOutQuad
* easeInCubic
* easeOutCubic
* easeInOutCubic
* easeInQuart
* easeOutQuart
* easeInOutQuart
* easeInQuint
* easeOutQuint
* easeInOutQuint
* easeInSine
* easeOutSine
* easeInOutSine
* easeInExpo
* easeOutExpo
* easeInOutExpo
* easeInCirc
* easeOutCirc
* easeInOutCirc
