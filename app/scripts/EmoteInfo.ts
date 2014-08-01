class EmoteInfo {

    constructor(
        public emoteName: string = '',

        public vibrate: boolean = false,
        public reverse: boolean = false,
        public brody: boolean = false,
        public invert: boolean = false,
        public hueRotate: boolean = false,

        public speed: string = '',
        public slide: string = '',
        public spin: string = '',

        public rotateDegrees: number = 0,
        public xAxisTranspose: number = 0,
        public zAxisTranspose: number = 0

    ) {}
//    constructor() {
//        this.emoteName = '';
//
//        this.vibrate = false;
//        this.reverse = false;
//        this.brody = false;
//        this.invert = false;
//        this.hueRotate = false;
//
//        this.speed = '';
//        this.slide = '';
//        this.spin = '';
//
//        this.rotateDegrees = 0;
//        this.xAxisTranspose = 0;
//        this.zAxisTranspose = 0;
//    }
//
//    // TODO: restrictions we need to add:
//    // -
//    // - speed must be in the set of valid animation speeds (enum?)
//    // - spin must be in the set of valid spin animations (enum?)
//    // - speed should only be allowed set when slide is enabled
//    // - slide should be "slide" or "!slide" (enum?)
//    // - xAxisTranspose limited to range of -150 to 150 (inclusive)
//    // - zAxisTranspose limited to range of 0 to 10 (inclusive)
//    // - disallow both invert and hueRotate being set at the same time  (enum instead of 2 booleans?)
//
//    emoteName: string;
//
//    vibrate: boolean;
//    reverse: boolean;
//    brody: boolean;
//    invert: boolean;
//    hueRotate: boolean;
//
//    speed: string;
//    slide: string;
//    spin: string;
//
//    rotateDegrees: number;
//    xAxisTranspose: number;
//    zAxisTranspose: number;
}
