# A Modular Synthesiser which Understands English
In modular synthesis the various components of a synthesiser are laid bare as 'modules', each of which performs a distinct sonic process. The musician is free to connect these modules up in any way they wish, allowing for an enormous variety of circuits and sonic outcomes. Analogue modular synthesisers can be bought as physical machines and are connected together with cables. Inside a computer many digital modular synthesisers exist which have various interfaces: from programming libraries/frameworks, like C-Sound, to specialist programming languages such as Faust, to the fully grown graphical interfaces of Pure-Data and Max-MSP.

For this project I am developing and probing the viability of an interface for modular synthesis which uses only sentences in English to communicate with the musician. I have written a special javascript library `english-io` to handle the linguistic side of the project. For the synthesiser itself, I will be using the `DUSP` javascript library, which I have been developing for the last 2 years.

The principals of `DUSP` will be familiar to anyone who has used Max or Pure Data, although some of the naming conventions are a little different:
 - The audio processing is carried out by objects called 'units'.
 - These units may have any number of 'inlets', which receive signals, and 'outlets' which send signals out of the unit.
 - An outlet may be routed to any number of inlets or left unused.
 - An inlet may be connected to exactly one outlet, otherwise it is assigned a constant value.
 - Units come in many classes, these determine how many inlets and outlets they have, and how they process the signals.
 - One or more units may be grouped together into a 'patch'. The patch can then be used in a similar way to a unit.
 - A complete system of units, inlets, outlets and patches is called a 'circuit'.
 - One outlet in a circuit is nominated as the 'rendering unit', from which audio is rendered and recorded.

Within `english-io`, a dictionary is defined using a list of nouns, adjectives and predicates. These objects, aside from defining words and syntactic structures, can be augmented with code which defines their logical and semantic implications.

I will begin by defining an `english-io` dictionary which includes the minimum vocabulary necessary to describe a `DUSP` circuit. Later on, I will expand this dictionary to allow more fluent and readable English, but for now we will settle with the minimum sufficient for a precise description.

Nouns:
  - unit
  - inlet
  - outlet
  - oscillator
  - noise generator
  - summing unit
  - multiplying unit

Predicates:
  - `BeAnInletOf` (Binary predicate relating an inlet its unit)
    syntax: `{verb: "be an inlet", params: ["subject", "of"]}`
    eg/ "The inlet is an inlet of the oscillator"

  - `BeAnOutletOf` (Binary predicate relating an outlet to its unit)
    syntax: `{verb: "be an outlet", params: ["subject", "of"]}`
    eg/ "The outlet is an outlet of the oscillator"

  - `BeRoutedTo` (Binary predicate routing an outlet to an inlet)
    syntax: `{verb: "be routed", params: ["subject", "to"]}`
    eg/ "The outlet is routed to the inlet"

  - `BeSetTo` (Binary predicate assigning an inlet some constant value*)
    syntax: `{verb: "be set", params: ["subject", "@to"]}`
    Eg/ "The inlet is set to 5Hz"

  - `BeTheRenderingOutlet` (Unary predicate nominating an outlet as the rendering outlet)
    syntax: `{verb: "be the rendering outlet", params: ["subject"]}`

* Note that the second argument of `BeSetTo` is not an entity but a number.

This dictionary mirrors the structure of the `DUSP` signal processing library exactly. Each noun corresponds to a class and each predicate corresponds to a function or an object property. It is therefore a simple matter to attach code that links the linguistic objects of the dictionary to their signal processing counterparts.

We now have a system which can perform two functions which are the inverse of one another. One function can take a `DUSP` Circuit object and produce a sequence of english sentences which describe it. The other takes such a set of sentences and assembles a `DUSP` Circuit object capable of producing audio. Of course the range of possible circuits and descriptions is limited by the strict and reduced vocabulary of the dictionary.

An example, consider the following schematic:

[Schematic diagram of two sine waves (200Hz and 1Hz) connected to a multiplier connected to the ADAC.]

This sets out a trivial DSP (digital signal processing) situations where a white noise generator is multiplied by a low frequency sine wave, with the result sent to a loud speaker. Using our dictionary, we translate the following sentences into a `DUSP` circuit which realises this schematic.

1. There is an oscillator.
2. The inlet that is an inlet of the oscillator is set to 1Hz.
3. There is a noise generator.
4. There is a multiplying unit.
5. The outlet that is an outlet of the oscillator is routed to the first inlet that is an inlet of the multiplying unit.
6. The outlet that is an outlet of the noise generator is routed to the second inlet that is an inlet of the multiplying unit.
7. The outlet that is an outlet of the multiplying unit is the rendering outlet.

Pithy. This approach begins to look especially long-winded when we consider that, using the DUSP library alone, this circuit could have been represented using just 10 characters: `Noise*Osc1`. But brevity is not everything and the point is that it works. Enter those eight sentences and the program will play a low sine wave that blinks in and out.

The program is perhaps more useful when performing the inverse operation, converting "Noise*Osc1" into a detailed description in a familiar language. But even here, most people would find it hard to follow what the computer was talking about if I had hidden the schematic and showed only the seven sentences. I have said brevity isn't everything, I may be forced to argue that usefulness isn't everything either if I cannot make some improvement.

Just for fun, before we move on, let's see what out program will come up with if we ask it to describe quite a complicated circuit for frequency modulated synthesis. 

"An inlet is an inlet of a multiplying unit. Another inlet is an inlet of the multiplying unit. An outlet is an outlet of the multiplying unit. Another outlet is routed to the first inlet. Another outlet is routed to the second inlet. The second outlet is an outlet of another multiplying unit. The third outlet is an outlet of a Repeater unit. Another inlet is an inlet of the second multiplying unit. Another inlet is an inlet of the second multiplying unit. Another inlet is an inlet of the Repeater unit. The third..."

This example runs to over 1600 words, and so the remained can be found in an appendix.

## Improvements upon the minimal dictionary.
How might we improve upon  this minimal dictionary? In the following pages I outline a series of experimental features which expand the expressive range of the program.

This comes at a cost. The minimal dictionary, being a precise mirror of the structure of the synthesis library, could easily be converted to its realised format (a `DUSP` circuit) and back to an english description without any loss of information. The new developments introduce ambiguities and assumptions (hard to avoid in any natural use of language) that turn the description and realisation algorithms into a lossy process.

The following is an inventory of the features added.

### More nouns to describe a wider range of synthesis components.
- 'attack envelope'
- 'decay envelope'
- 'low pass filter'
- 'high pass filter'
- 'panner'

The 'oscillator' noun is removed from the dictionary and replaced with four phrasal-nouns which are more descriptive.
- 'sine wave'
- 'triangle wave'
- 'square wave'
- 'sawtooth wave'
 
### Flexible arguments for `BeRoutedTo` and other predicates.
Previously, the `BeRoutedTo` predicate had strict rules about what arguments it would accept. The first argument had to be an outlet and the second had to be an inlet, otherwise the sentence would be flagged as invalid. Now, it can be used with any combination of inlet, outlets and units as its arguments, the program will make an informed assumption as to what was really meant.

For example, if we now write:
	"The noise generator is routed to the low pass filter."

The program will assume that we meant the _output of_ the noise generator and the _first inlet of_ the lowpass filter. Before it would have been necessary to write:
	"The outlet that is an outlet of the noise generator is routed to the inlet that is an inlet of the low pass filter."

A similar update is made to most other predicates that take inlets and outlets as arguments.

### A shorter syntax for referring to specific inlets and outlets.
Before, if we wanted to refer to a specific inlet or outlet with respect to the unit it belongs to, we had to write quite a verbose noun-phrase, derived from the `BeAnInletOf` or `BeAnOutletOf` predicates.

Eg/ "The outlet that is an outlet of the summing unit"

A contracted version, using a single preposition, 'of', can now be used.

Eg/ "The outlet of the summing unit"

### An algorithm for estimating the intended 'rendering outlet'
It is cumbersome to have to specify the _rendering outlet_ using the `BeRenderingOutlet` predicate. An algorithm is introduced to guess which outlet should be used to record audio in the case that the user omits to specify.

The algorithm generates a numeric score for each outlet that is not routed to any inlets. For every unconnected outlet, it counts the number of units that route output to the unit  that the outlet belongs to - either directly, or via any number of other units. The outlet with the highest score is assumed to be the rendering outlet.

These estimations are reliable enough that the `BeRenderingOutlet`, although still available, is almost obsolete. 

### New (binary) predicate: `BeDisconnectedFrom`
syntax: 
`[
    {verb: 'be disconnected', params:['subject', 'from']},
    {verb: 'be disconnected', params:['from', 'subject']}
 ]`

This predicate has the opposite behaviour to the `BeRoutedTo` predicate.

### New (binary) predicate: `Modulate`
syntax: 
	`[
 	   {verb:'modulate', params:['subject', 'object']},
  	 {verb:'be modulated by', params:['object', 'subject']}
 	]`

This predicate has a somewhat complex behaviour. Like `BeRoutedTo` it takes an outlet and an inlet as its arguments, but can make informed assumptions for other combinations. Whereas `BeRoutedTo` replaces the inlet's existing routing or constant value with a new routing, `Modulate` modifies the circuit to incorporate *both* the new and the old routings. If the inlet has a linear scale, the old routing and the new are summed, with the result routed to the inlet.

For example,
	"A decay envelope is set to 2 seconds."
	"A sine wave modulates the duration the decay envelope."

[2 schematics showing the circuit after the first and second sentences.]

For inlets that do not have a linear scale, such as frequencies, the resultant circuit is more complicated.

### New (binary) predicate: `BeMultipliedBy`
syntax:
`[
    {verb:'be multiplied', params:['subject', 'by']},
    {verb:'be attenuated', params:['subject', 'by']},
    {verb:'attenuate', params:['subject', 'object']},
 ]`

This predicate takes two outlets as its arguments. It creates a new multiplying unit and routes the two given outlets to the its inlets.

Eg/ "A square wave is multiplied by a decay envelope."

[Schematic]

The `BeMultipliedBy` predicate has a slightly misleading behaviour, owing to an oversight in the way the program as a whole is structured. Suppose we tell the program: 

"The output of the square wave is attenuated by the sine wave. The output of the square wave is routed to a summing unit."

Intuitively we would expect it to build a circuit something like:

[ Schematic: (Sq * O) + ... ]

But the actual result is:

[ Schematic ]

This is because the outlet of the square wave oscillator (labelled in orange) retains its identity as "The output of the square wave" after it is routed into a multiplying unit. There is no easy fix for this without significant revisions to the way the program is designed.

### New (binary) predicate: BeAddedTo
This predicate works in exactly the same way as `BeMultipliedBy` except using a summing unit instead of a multiplying unit.

### New (unary) predicate: Retrigger
syntax: 
`[
    {verb:'retrigger', params:['subject']},
    {verb:'trigger', params:['subject']},
    {verb:'start', params:['subject']},
    {verb:'restart', params:['subject']},
 ]`

This predicate takes an envelope as its argument and restarts it at the from the beginning.

### Imperative Predicates 
(*see src/dictionary/predicates/imperative.js*)
So far, all the predicates in the dictionary have been designed to be used in declarative tenses. Eg/ "The outlet _is_ routed to the inlet". A new set of predicates are now added which can be used in the imperative tense. This allows us to give the program instructions such as:

"Route the sine wave to the summing unit."

Which has the same meaning as:

"The sine wave is routed to summing unit."

These additions do not expand the range of instructions we can give to the computer, but it does increase the variety of syntaxes that we can use express those instructions. Hopefully making our instructions read a little more naturally.

Note that in the imperative tense the subject is omitted. `english-io` can't abide this and so it makes an assumption that all imperative sentences have a single entity called 'the human' as their subject. Therefore "Set the frequency to 7Hz." gets translated as "The human sets the frequency to 7Hz."

List of imperative predicates:
	- `RouteTo` maps to `BeRoutedTo`. eg/ "Route the sine wave to the summing unit."
	- `SetTo` maps to `BeSetTo`. eg/ "Set the frequency to 7Hz."
	- `DisconnectFrom` maps to `BeDisconnectedFrom`. eg/ "Disconnect the sine wave from the summing unit."
	- `MultiplyBy` maps to `BeMultipliedBy`. eg/ "Multiply the sine wave by the triangle wave."

Clearly this stock of imperative predicates is incomplete. There is no `AddTo` or `ModulateBy` for example. Future versions of this software will have an imperative predicate corresponding to almost every declarative predicate.

### Predicates for automation: `SlideFromToIn`, `SlideFromTo`, `SlideTo` and `SlideToIn`.
*(see src/dictionary/predicates/automation.js)*
syntax: `[
    {verb:'slide', params:['subject', '@from', '@to', '@in']},
    {verb:'glide', params:['subject', '@from', '@to', '@in']},
    {verb:'move smoothly', params:['subject', '@from', '@to', '@in']},
    {verb:'slide', params:['subject', '@from', '@to', '@over']},
    {verb:'glide', params:['subject', '@from', '@to', '@over']},
    {verb:'move smoothly', params:['subject', '@from', '@to', '@over']},
  ]`

The `SlideFromToIn` predicate takes four arguments: an inlet, a starting value (`from`), a finishing value (`to`) and a duration (`in`). It smoothly adjusts the value of an inlet `from` one value `to` another `in` a given number of seconds. It achieves this by creating an envelope with the specified parameters and routing this to the inlet.

Eg/ "A sine wave slides from 200Hz to 20Hz in 5 seconds."

[Schematic]

The other three predicates `SlideFromTo`, `SlideTo` and `SlideToIn` allow the omission of various arguments of `SlideFromToIn`. If `from` is omitted, the slide will begin from the current value of the inlet. If `in` (the duration) is omitted, a  short duration will be chosen at random.

### Entity Spawners
_(see src/dictionary/spawners.js)_
The creation of a new entity in `english-io` is called "spawning". So far we've seen three ways entities can be spawned.

1. By means of a simple noun phrase entered by the user. Eg/ "the sine wave".
2. Implied by the existence of another entity. For example, when we spawn "a sine wave" we are also spawning its frequency inlet and its outlet by implication.
3. In the special case that we are generating a description of an existing DUSP circuit, the program will automatically spawn all the entities it needs to make the description. _(see src/entify.js)_

The *EntitySpawner* class provides another way for the user to declare new entities, using more flexible syntax than 'a/the/another _noun_'. Entity spawners can be declared by themselves or as an argument of a sentence.

### List of entity spawners added to the dictionary.

#### SumOf
syntax: `sum of L_`
`SumOf` takes a list consisting of any number of units or outlets in place of `L_` and chains summing units together to produce the sum of all the arguments.

Eg/ "The sum of a sine wave, a triangle wave, a square wave and a sawtooth wave"

Result: [Schematic]

#### MultipliedBy
syntax: `_ multiplied by _`
Takes two outlets as arguments and routes them to a new multiplying unit. Serves as a reference to the multiplying unit.

eg/ "A square wave multiplied by a sine wave"
Result:
	[Schematic]

This entity spawner is an example of how some of the features building upon the minimal dictionary are incompatible with each other. It is dangerously similar to the `BeMultipliedBy` and `MultiplyBy` predicates, the parsing algorithm will in some circumstances become muddled.

#### HzSineWave, HzTriangleWave, HzSquareWave and HzSawtoothWave
syntax: `#_Hz sine wave`, `#_Hz triangle wave`, ... etc.
These four entity spawners each take a single number as their argument and create a new oscillator with the given frequency.

Eg/ "A 5Hz triangle wave"
Result: 
[schematic]

#### RandomSineWave
syntax: `random sine wave`
Takes no arguments, creates a sine oscillator with a random frequency.
eg/ "The sum of a random sine wave and another random sine wave"
Result:
[schematic]

#### SecondDecayEnvelope and SecondAttackEnvelope
syntax: `#_(?:s| second) decay envelope` and `#_(?:s| second) attack envelope` respectively
These two entity spawners each take one number (in place of `#_`) as an argument and create an envelope of that duration.
Eg/ "a 0.03s decay envelope" or "a 60 second attack envelope"

### Sentence modifiers
There are also two SentenceModifier objects added to the dictionary, these can be used at the beginning or the end of any sentence.

`AfterSeconds` (syntax: `after #_ seconds`): Delays the the action of a sentence until `#_` seconds have passed.
Eg/ "After 10 seconds, the frequency slides to 50Hz"

`EverySeconds` (syntax: `every #_ seconds`): Repeats the action of a sentence at an interval of `#_` seconds.
Eg/ "Every 2 seconds, another random sine wave modulates the triangle wave"

Note: DUSP does not render in real time, so these timings refer to the internal clock inside the rendering engine.