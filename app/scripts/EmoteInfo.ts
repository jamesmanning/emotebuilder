class EmoteInfo {


    // TODO: restrictions we need to add:
    //
    // - speed must be in the set of valid animation speeds (enum?)
    // - spin must be in the set of valid spin animations (enum?)
    // - speed should only be allowed set when slide is enabled
    // - slide should be boolean
    // - xAxisTranspose limited to range of -150 to 150 (inclusive)
    // - zAxisTranspose limited to range of 0 to 10 (inclusive)
    // - disallow both invert and hueRotate being set at the same time  (enum instead of 2 booleans?)


    public static speedOptions: string[] = ['slowest', 'slower', 'slow', 'fast', 'faster', 'fastest'];
    public static spinOptions: { name: string; emoteFlag: string }[] = [
        { name: 'spin clockwise around x axis', emoteFlag: 'xspin' },
        { name: 'spin clockwise around y axis', emoteFlag: 'yspin' },
        { name: 'spin clockwise around z axis', emoteFlag: 'zspin' },
        { name: 'spin clockwise around all 3 axes ', emoteFlag: 'spin' },

        { name: 'spin counterclockwise around x axis', emoteFlag: '!xspin' },
        { name: 'spin counterclockwise around y axis', emoteFlag: '!yspin' },
        { name: 'spin counterclockwise around z axis', emoteFlag: '!zspin' },
        { name: 'spin counterclockwise around all 3 axes ', emoteFlag: '!spin' },
    ];
    public static coloringOptions: { name: string; emoteFlag: string }[] = [
        { name: 'hue rotate', emoteFlag: 'i' },
        { name: 'invert', emoteFlag: 'invert' },
    ];

    constructor(
        public emoteName: string = '',

        public vibrate: boolean = false,
        public reverse: boolean = false,
        public brody: boolean = false,
//        public invert: boolean = false,
//        public hueRotate: boolean = false,
        public slide: boolean = false,

        public speed: string = '',
        public spin: string = '',
        public coloring: string = '',

        public rotateDegrees: number = 0,
        public xAxisTranspose: number = 0,
        public zAxisTranspose: number = 0

    ) {}
}
