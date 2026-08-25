document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const TO = "gamba0412@gmail.com";

  const val = (id) => (document.getElementById(id).value || "").trim();
  const checkedValues = (name) =>
    Array.from(form.querySelectorAll(`input[name="${name}"]:checked`)).map((el) => el.value);
  const radioValue = (name) => {
    const checked = form.querySelector(`input[name="${name}"]:checked`);
    return checked ? checked.value : "";
  };
  const line = (label, value) => `${label}: ${value || "(未入力)"}`;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = val("name");
    const email = val("email");
    const business = val("business");
    const consultTypes = checkedValues("ご相談内容");

    if (!name || !email || !business || consultTypes.length === 0) {
      window.alert(
        "「お名前」「メールアドレス」「業種・事業内容」「ご相談内容(1つ以上)」は必須項目です。ご入力をお願いいたします。"
      );
      return;
    }

    const sections = [
      {
        title: "1. 基本情報",
        lines: [
          line("お名前", name),
          line("会社名・屋号", val("company")),
          line("メールアドレス", email),
          line("電話番号", val("tel")),
          line("業種・事業内容", business),
          line("現在のWebサイトURL", val("current-url")),
          line("SNS URL", val("sns-url")),
          line("イメージHPのURL", val("image-url")),
        ],
      },
      {
        title: "2. 今回の依頼内容",
        lines: [
          line("ご相談内容", consultTypes.join("、")),
          line("ホームページを作りたい理由", val("reason")),
          line("現在困っていること", val("trouble")),
          line("ホームページで叶えたいこと", val("goal")),
        ],
      },
      {
        title: "3. ホームページの目的",
        lines: [line("目的", checkedValues("ホームページの目的").join("、"))],
      },
      {
        title: "4. ターゲット",
        lines: [
          line("主なお客様", val("target-who")),
          line("年齢層", val("target-age")),
          line("性別", radioValue("性別")),
          line("個人向け/法人向け", radioValue("個人・法人")),
          line("主な地域", val("target-area")),
          line("どんな悩みを持っている人か", val("target-trouble")),
          line("どんな人から問い合わせてほしいか", val("target-inquiry")),
        ],
      },
      {
        title: "5. 掲載したいページ",
        lines: [line("掲載希望ページ", checkedValues("掲載したいページ").join("、"))],
      },
      {
        title: "6. どのようなHPにしたいか",
        lines: [val("free-note") || "(未入力)"],
      },
    ];

    const body = sections
      .map((s) => `■ ${s.title}\n${s.lines.join("\n")}`)
      .join("\n\n");

    const subject = `【LEAF】制作のご依頼(${name}様)`;
    const gmailUrl =
      "https://mail.google.com/mail/?view=cm&fs=1" +
      `&to=${encodeURIComponent(TO)}` +
      `&su=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, "_blank");
  });
});
