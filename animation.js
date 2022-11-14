var config = {
  type: Phaser.AUTO,
  backgroundColor: "#151515",
  scale: {
    parent: "phaser-game",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1920,
    height: 1080,
  },
  scene: {
    init: init,
    preload: preload,
    create: create
  },
};

let game = new Phaser.Game(config);
let girl1;
let boy1;
let cpLogo;
let cpLogoStatic;
let background;

function init() {
  //  Inject our CSS
  console.log("injecting webfonts");
  let element = document.createElement("style");

  document.head.appendChild(element);

  let sheet = element.sheet;

  let styles =
    '@font-face { font-family: "RedHatDisplay-Regular"; src: url("webfonts/RedHatDisplay/RedHatDisplay-Regular.woff") format("woff"); }\n';

  sheet.insertRule(styles, 0);

  styles =
    '@font-face { font-family: "RedHatDisplay-Bold"; src: url("webfonts/RedHatDisplay/RedHatDisplay-Bold.woff") format("woff"); }';

  sheet.insertRule(styles, 0);
}

function preload() {
  this.load.script(
    "webfont",
    "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
  );
  this.load.image("gir1_happy", "images/gir1_happy.png");
  this.load.image("gir1_sad", "images/gir1_sad.png");
  this.load.image("boy1_happy", "images/boy1_happy.png");
  this.load.image("boy1_sad", "images/boy1_sad.png");
  this.load.image("cp_logo", "images/cp_logo.png");
  this.load.image("hat", "images/hat.png");
  this.load.image("bg_sad", "images/sadarrows.png");
  this.load.image("bg_no_arrows", "images/noarrows.png");
  this.load.image("bg_happy", "images/happyarrows.png");
}

function create() {
  background = this.add.sprite(0, 0, "bg_sad");
  background.setOrigin(0, 0);

  girl1 = this.add.sprite(550, 180, "gir1_sad");
  boy1 = this.add.sprite(220, 270, "boy1_sad");

  let bezierCurve = new Phaser.Curves.CubicBezier(
    { x: 1550, y: 950 },
    { x: 1400, y: 850 },
    { x: 500, y: 450 },
    { x: 450, y: 550 }
  );

  // create Red Hat Logo
  WebFont.load({
    custom: {
      families: ["RedHatDisplay-Regular", "RedHatDisplay-Bold"],
    },
    active: () => {
      cpLogo = this.add.container(1550, 950);
      let hat = this.add.sprite(-203, 0, "hat");

      let redHatText = this.add.text(-100, -56, "Red Hat", {
        fontFamily: "RedHatDisplay-Regular",
        fontSize: 52,
        color: "#FFFFFF",
      });

      let customerPortalText = this.add.text(-100, -2, "Customer Portal", {
        fontFamily: "RedHatDisplay-Bold",
        fontSize: 51,
        color: "#FFFFFF",
      });

      cpLogo.add(hat);
      cpLogo.add(redHatText);
      cpLogo.add(customerPortalText);

      // Draw static CP Logo
      cpLogoStatic = this.add.container(1550, 950);
      let hatStatic = this.add.sprite(-203, 0, "hat");
      let redHatTextStatic = this.add.text(-100, -56, "Red Hat", {
        fontFamily: "RedHatDisplay-Regular",
        fontSize: 52,
        color: "#FFFFFF",
      });
      let customerPortalTextStatic = this.add.text(
        -100,
        -2,
        "Customer Portal",
        {
          fontFamily: "RedHatDisplay-Bold",
          fontSize: 51,
          color: "#FFFFFF",
        }
      );
      cpLogoStatic.add(hatStatic);
      cpLogoStatic.add(redHatTextStatic);
      cpLogoStatic.add(customerPortalTextStatic);

      // Draw edge lables
      this.add.text(1600, 730, "Enterprise core", {
        fontFamily: "RedHatDisplay-Regular",
        fontSize: 30,
        color: "#FFFFFF",
      });
      this.add.text(1550, 500, "Provider edge", {
        fontFamily: "RedHatDisplay-Regular",
        fontSize: 30,
        color: "#FFFFFF",
      });
      this.add.text(1450, 200, "End-user premises edge", {
        fontFamily: "RedHatDisplay-Regular",
        fontSize: 30,
        color: "#FFFFFF",
      });

      // Draw Internet Limited Edge Label
      let internetLimitedContainer = this.add.container(260, 830);
      let list1 = this.add.text(0, -110, "Net-limited edges", {
        fontFamily: "RedHatDisplay-Bold",
        fontSize: 50,
        color: "#FFFFFF",
      });
      let list2 = this.add.text(10, -50, "- Secure facilities", {
        fontFamily: "RedHatDisplay-Regular",
        fontSize: 47,
        color: "#FFFFFF",
      });
      let list3 = this.add.text(10, 0, "- Ships at sea", {
        fontFamily: "RedHatDisplay-Regular",
        fontSize: 47,
        color: "#FFFFFF",
      });
      let list4 = this.add.text(10, 50, "- Space", {
        fontFamily: "RedHatDisplay-Regular",
        fontSize: 47,
        color: "#FFFFFF",
      });
      internetLimitedContainer.add(list1);
      internetLimitedContainer.add(list2);
      internetLimitedContainer.add(list3);
      internetLimitedContainer.add(list4);

      // Draw credits
      this.add.text(
        100,
        1050,
        "Art by Ann Nguen | Animation by Jared & Rowan Sprague",
        {
          fontFamily: "RedHatDisplay-Regular",
          fontSize: 20,
          color: "#FFFFFF",
        }
      );
    },
  });

  this.input.on("pointerdown", () => {
    let tweenObject = {
      val: 0,
    };
    this.tweens.add({
      targets: tweenObject,
      val: 1,
      duration: 3200,
      yoyo: false,
      repeat: false,
      ease: "Sine.easeInOut",
      callbackScope: this,
      onUpdate: (tween, target) => {
        var position = bezierCurve.getPoint(target.val);
        cpLogo.x = position.x;
        cpLogo.y = position.y;
      },
      onComplete: () => {
        setTimeout(() => {
          girl1.setTexture("gir1_happy");
          boy1.setTexture("boy1_happy");
          background.setTexture("bg_happy");

          setTimeout(() => {
            this.tweens.addCounter({
              from: -5,
              to: 5,
              duration: 300,
              repeat: -1,
              yoyo: true,
              onUpdate: function (tween) {
                girl1.setAngle(tween.getValue());
                boy1.setAngle(tween.getValue());
              },
            });
          }, 250);
        }, 500);
      },
      onStart: () => {
        background.setTexture("bg_no_arrows");
      },
    });
  });
}

