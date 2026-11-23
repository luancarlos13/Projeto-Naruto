const normalizar = (texto = "") =>
  texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();


const aliases = {
  "love hashira": "mitsuri kanroji",
  pedra: "gyomei himejima",
  mestre: "ubuyashiki",
  "lua 1": "kokushibo",
};

const personagens = {
  1: { titulo: "Naruto Uzumaki", imagem: "personagens/naruto_uzumaki_capa.jpg", paragraph: "Naruto Uzumaki é um shinobi de Konohagakure do clã Uzumaki e protagonista homônimo da franquia Naruto. Desde seu nascimento, ele se tornou jinchuuriki das Nove-Caudas, um destino que o levou a ser condenado e negligenciado por toda a aldeia durante sua infância. Depois de entrar para o Time 7, ao lado de Sakura Haruno, Sasuke Uchiha e sob comando de Kakashi Hatake." },
  2: { titulo: "Sasuke Uchiha", imagem: "personagens/Sasuke_epi_319.webp", paragraph: "Sasuke Uchiha é um dos últimos membros sobreviventes do clã Uchiha de Konohagakure e a reencarnação e descendente de Indra Ōtsutsuki. Após seu irmão mais velho, Itachi, massacrar seu clã, ele se junta ao Time 7 ao se tornar um shinobi e, através da competição com seu rival e melhor amigo, Naruto Uzumaki." },
  3: { titulo: "Sakura Haruno", imagem: "personagens/Sakura_3Fssico%2529.webp", paragraph: "Sakura Haruno é uma kunoichi de Konohagakure. Quando designada para o Time 7, ela rapidamente se viu mal preparada para os deveres de um shinobi. No entanto, após treinar com o lendário Sannin Tsunade, Sakura supera suas fraquezas e se torna reconhecida como uma das maiores ninjas médicas do mundo. Após a Quarta Guerra Mundial Shinobi, ela se juntou ao Clã Uchiha ao se casar com Sasuke Uchiha. Mais tarde, ela se tornou chefe do Departamento Médico de Konoha e professora de ninjutsu médico." },
  4: { titulo: "Kakashi Hatake", imagem: "personagens/Kakashi_Hatake_29.PNG.webp", paragraph: "Kakashi Hatake é um shinobi de Konohagakure. Ele recebeu um Sharingan de seu ex-companheiro de equipe, Obito Uchiha, quando era mais jovem, fazendo-o ser conhecido como Kakashi o Ninja Copiador e Kakashi do Sharingan. Seu prodigioso talento, habilidades e destreza com o Sharingan fizeram dele um dos mais capazes ninjas da aldeia, sendo reconhecido em todo o mundo ninja. Ele acaba sendo nomeado como líder do Time Kakashi, onde ele usa seus anos de experiência para treinar seus alunos para se tornarem ninjas habilidosos de suas próprias maneiras." },
  5: { titulo: "Iruka Umino", imagem: "personagens/iruka.jpg", paragraph: "Iruka Umino é um shinobi de nível chuunin de Konohagakure que atua principalmente como um instrutor na Academia." },
  6: { titulo: "Hiruzen Sarutobi", imagem: "personagens/Hiruzen_Sarutobi.webp", paragraph: "Hiruzen Sarutobi foi o Terceiro Hokage, literalmente significa: Terceira Sombra do Fogo) de Konohagakure. Sendo um discípulo do Hokage anterior da vila, Hiruzen era um ninja poderoso, aclamado como o Deus Shinobi. Embora ele seja originalmente o professor dos Sannin, várias gerações de ninjas de Konoha se beneficiaram de sua sabedoria durante sua vida." },
  7: { titulo: "Rock Lee", imagem: "personagens/Lee_Pose.webp", paragraph: "Rock Lee é um shinobi de Konohagakure. Apesar de ele não ter certas habilidades tipicamente associadas com a vida como um ninja, Lee pretende compensar suas deficiências de qualquer maneira que puder. Recebendo treinamento especial a este respeito de seu professor, Might Guy, ele se torna um mestre em taijutsu e visa apenas ficar mais forte. Anos mais tarde, ele passa suas habilidades e métodos de treinamento para seu filho." },
  8: { titulo: "Neji Hyuga", imagem: "personagens/neji.jpg", paragraph: "Neji Hyuuga foi um membro do clã Hyuuga e um shinobi de Konohagakure. Embora tenha sido um prodígio mesmo pelos padrões dos Hyuuga, Neji era um membro da casa secundária; por isso, não importa quão habilidoso tornou-se, ele estaria sempre a serviço da casa principal Hyuuga, um fato que convenceu-o de que o destino era predeterminado. Depois de ver a recusa de Naruto Uzumaki de ser limitado por uma ideologia como esta, Neji percebeu que seu destino foi o que ele escolheu para si mesmo, e como um membro do Time Guy, ele buscou a força necessária para fazer o futuro que ele queria para sua família e amigos." },
  9: { titulo: "Tenten", imagem: "personagens/tenten.png", paragraph: "Tenten é um membro do Time Guy de Konohagakure. Usando suas habilidades com armas, ela treina para ser uma poderosa kunoichi. Seu amor por armas é tão grande que mais tarde ela abre uma loja de armas." },
  10:{ titulo: "Might Guy", imagem: "personagens/guy.jpg", paragraph: "Might Guy é um jōnin de Konohagakure. Mestre em taijutsu, Guy lidera e transmite sua sabedoria aos membros do Time Guy." },
  11:{ titulo: "Hinata Hyuga", imagem: "personagens/hinata.jfif", paragraph: "Hinata Hyuga, é a maior personagem de assistência da série. Ela é um membro dos clãs Hyuuga e Uzumaki de Konohagakure. Tendo um temperamento humilde, a falta de auto-confiança de Hinata era refletida em suas habilidades — traços que fizeram seu pai considerar que ela não era adequada para a sua posição como herdeira do clã." },
  12:{ titulo: "Kiba Inuzuka", imagem: "personagens/kiba.jfif", paragraph: "Kiba Inuzuka é um membro do clã Inuzuka de Konohagakure. Tanto ele quanto seu companheiro canino, Akamaru, são membros do Time Kurenai." },
  13:{ titulo: "Shino Aburame", imagem: "personagens/Shino.webp", paragraph: "Shino Aburame é um shinobi do clã Aburame de Konohagakure . Quieto e, às vezes, desagradável para alguns, Shino usa as técnicas de seu clã baseadas em insetos contra o Time Kurenai. Anos depois, Shino se tornou um jōnin e professor da Academia." },
  14:{ titulo: "Kurenai Yuhi", imagem: "personagens/kurenai.jpg", paragraph: "Kurenai Yuuhi é uma kunoichi de nível jounin de Konohagakure. Ela também era a líder do Time Kurenai, que consiste em: Hinata Hyuuga, Shino Aburame, Kiba Inuzuka e Akamaru." },
  15:{ titulo: "Shikamaru Nara", imagem: "personagens/shikamaru.jpeg", paragraph: "Shikamaru Nara é um membro do clã Nara de Konohagakure. Apesar de ser preguiçoso por natureza, Shikamaru tem um intelecto raro que constantemente lhe permite prevalecer em combate. As responsabilidades que esse intelecto gera para ele frequentemente o deixam aborrecido, mas ele as aceita de bom grado, para que possa estar a serviço de seus companheiros do Time Asuma, e para provar a si mesmo e às gerações do passado e do futuro o seu valor." },
  16:{ titulo: "Choji Akimichi", imagem: "personagens/chouji.webp", paragraph: "Chouji Akimichi é um membro do clã Akimichi de Konohagakure. Embora seja sensível com relação ao seu peso, Chouji é, contudo, dedicado aos seus amigos, especialmente o Time Asuma." },
  17:{ titulo: "Ino Yamanaka", imagem: "personagens/Ino.webp", paragraph: "Ino Yamanaka é um membro do clã Yamanaka de Konohagakure. Ela e seus colegas do Time Asuma formam o Ino–Shika–Chou. " },
  18:{ titulo: "Asuma Sarutobi", imagem: "personagens/Asuma_usando_Chakura_Nagashi.PNG.webp", paragraph: "Asuma Sarutobi foi um jounin do clã Sarutobi de Konohagakure, assim como um ex-membro dos Doze Guardiões Ninja. Ele também foi o líder do Time Asuma, que consistia em Shikamaru Nara, Ino Yamanaka e Chouji Akimichi." },
  19:{ titulo: "Gaara", imagem: "personagens/gaara.jpg", paragraph: "Gaara é um shinobi de Sunagakure. O Shukaku foi selado em seu corpo no dia de seu nascimento, um procedimento que resultou na morte de sua mãe. Considerado como um monstro pela vila e sem ninguém para amá-lo, Gaara passou a desprezar o mundo e começou contando apenas com sua própria força, ganhando o título de Gaara do Deserto." },
  20:{ titulo: "Temari", imagem: "personagens/temari.jpg", paragraph: "Temari é uma antiga kunoichi do clã dos Kazekage e emissária de Sunagakure." },
  21:{ titulo: "Kankuro", imagem: "personagens/kankuro.jpg", paragraph: "Kankurou é um shinobi de Sunagakure e um dos três Irmãos da Areia." },
  22:{ titulo: "Kabuto Yakushi", imagem: "personagens/Kabuto.webp", paragraph: "Kabuto Yakushi é um personagem do mangá e anime Naruto, escrito e desenhado pelo mangaká Masashi Kishimoto. É um dos principais Antagonistas do mangá. Seu nome pode derivar da última parte do nome japonês da planta ToriKabuto ou da primeira parte do nome kabutogani, ou ainda do nome do capacete de um samurai." },
  23:{ titulo: "Orochimaru", imagem: "personagens/Orochimaru.PNG.webp", paragraph: "Orochimaru é um dos Lendários Sannin, junto com Tsunade e Jiraiya, de Konohagakure. Com sua ambição de vida sendo aprender todos os segredos do mundo, Orochimaru buscou a imortalidade para que ele pudesse viver todas as vidas necessárias para realizar sua tarefa." },
  24:{ titulo: "Jiraiya", imagem: "personagens/jiraya.jpg", paragraph: "Jiraiya foi um dos Sannin Lendários, junto com Tsunade e Orochimaru, treinados por Hiruzen Sarutobi. Ele era um auto-proclamado super-pervertido, e o escritor da popular série de livros de ficção para adultos, chamado Icha Icha. Ele também era conhecido como o Sennin dos Sapos, por causa da sua assinatura de invocação de sapos, e por seu status como Sennin." },
  25:{ titulo: "Tsunade Senju", imagem: "personagens/tsunade.webp", paragraph: "Tsunade é uma dos Sannin Lendários de Konohagakure. Embora seja considerada a kunoichi mais forte do mundo e a maior ninja médica, Tsunade abandonou a vida de shinobi por muitos anos em busca de outros objetivos. Ela acaba sendo convencida a voltar para Konoha e se torna a Quinta Hokage." },
  26:{ titulo: "Shizune", imagem: "personagens/Shizune_29.webp", paragraph: "Shizune é uma kunoichi de nível Jounin de Konohagakure, discípula e braço direito de Tsunade (a Quinta Hokage)." },
  27:{ titulo: "Konohamaru Sarutobi", imagem: "personagens/konohamaru.jfif", paragraph: "Konohamaru Sarutobi é um shinobi de Konohagakure, sendo nomeado com o mesmo nome da aldeia. Ele vem do clã Sarutobi e era um membro do Time Ebisu. Ele também lidera o Time Konohamaru, que consiste em Boruto Uzumaki, Mitsuki e Sarada Uchiha. Ele trabalha duro para um dia se tornar um Hokage e ficar tão forte como o seu rival e ídolo, Naruto Uzumaki." },
  28:{ titulo: "Itachi Uchiha", imagem: "personagens/itachi.webp", paragraph: "Itachi Uchiha é um dos personagens mais emblemáticos da franquia de anime e mangá Naruto, criado por Masashi Kishimoto. Apresentado inicialmente como um vilão implacável e renegado que exterminou o próprio clã, sua trajetória revela-se como a de um herói trágico que sacrificou a própria reputação e vida em prol da paz." },
  29:{ titulo: "Kisame Hoshigaki", imagem: "personagens/kisame.avif", paragraph: "Kisame Hoshigaki conhecido como o Monstro da Névoa Oculta e o Bijuu Sem Cauda, é um dos antagonistas mais marcantes da obra Naruto." },
  30:{ titulo: "Zabuza Momochi", imagem: "personagens/Zabuza.webp", paragraph: "Zabuza Momochi (conhecido como o Demônio da Névoa Oculta) é um ninja renegado de nível Jounin da Vila da Névoa (Kirigakure) e um dos antigos Sete Espadachins da Névoa, sendo o primeiro grande antagonista apresentado na série Naruto." },
  31:{ titulo: "Haku", imagem: "personagens/haku.jfif", paragraph: "Haku é um personagem de 15 anos da obra Naruto, conhecido por sua aparência andrógina, lealdade inabalável a Zabuza Momochi e por possuir uma poderosa Kekkei Genkai de Gelo." },
  32:{ titulo: "Kimimaro", imagem: "personagens/Kimimaro_29.webp", paragraph: "Kimimaro Kaguya é o único sobrevivente do clã Kaguya e um dos subordinados mais leais de Orochimaru na obra Naruto. Ele liderava o antigo Quinteto do Som (depois Quarteto do Som) e servia como um dos candidatos a receptáculo físico para a imortalidade de Orochimaru." },
};


const personagensPorSlug = Object.entries(personagens).reduce((accumulator, [id, personagem]) => {
  accumulator[normalizar(personagem.titulo)] = { id, ...personagem };
  return accumulator;
}, {});


function encontrarPersonagemPorTexto(texto = "") {
  const slug = aliases[normalizar(texto)] || normalizar(texto);
  const correspondenciaExata = Object.values(personagensPorSlug).find((personagem) => {
    return normalizar(personagem.titulo) === slug;
  });

  if (correspondenciaExata) {
    return correspondenciaExata;
  }

  const correspondenciaPorNome = Object.values(personagensPorSlug).find((personagem) => {
    return normalizar(personagem.titulo).split(" ").includes(slug);
  });

  if (correspondenciaPorNome) {
    return correspondenciaPorNome;
  }

  return Object.values(personagensPorSlug).find((personagem) => {
    const tituloSlug = normalizar(personagem.titulo);
    return tituloSlug.includes(slug) || slug.includes(tituloSlug);
  });
}

function preencherDetalhesDoPersonagem() {
  const params = new URLSearchParams(window.location.search);
  const personagemSlug = params.get("personagem");
  const personagem = personagemSlug
    ? Object.values(personagensPorSlug).find((item) => normalizar(item.titulo) === personagemSlug)
    : null;

  const titulo = document.getElementById("detalhes-titulo");
  const imagem = document.getElementById("detalhes-imagem");
  const descricao = document.getElementById("detalhes-descricao");

  if (titulo && imagem && descricao && personagem) {
    titulo.textContent = personagem.titulo;
    imagem.src = personagem.imagem;
    imagem.alt = personagem.titulo;
    descricao.textContent = personagem.paragraph;

    const painel = document.querySelector("main");
    if (painel) {
      painel.style.background = "#000000";
    }
  }
}

function adicionarCliqueNasBandeiras() {
  const cards = document.querySelectorAll(".container-cards .cards");

  cards.forEach((card) => {
    const imagem = card.querySelector("img");
    imagem.style.cursor = "pointer";
    card.setAttribute("role", "link");
    card.setAttribute("tabindex", "0");

    const abrirDetalhes = () => {
      const personagem = encontrarPersonagemPorTexto(imagem.alt || "");

      if (!personagem) {
        return;
      }

      const url = `index2.html?personagem=${encodeURIComponent(normalizar(personagem.titulo))}`;
      window.location.href = url;
    };

    card.addEventListener("click", abrirDetalhes);
    card.addEventListener("keydown", (evento) => {
      if (evento.key === "Enter" || evento.key === " ") {
        evento.preventDefault();
        abrirDetalhes();
      }
    });
  });
}

function configurarMenuResponsivo() {
  const menu = document.querySelector(".menu");
  const botao = document.querySelector(".menu-toggle");

  if (!menu || !botao) {
    return;
  }

  botao.addEventListener("click", () => {
    const aberto = menu.classList.toggle("menu-aberto");
    botao.setAttribute("aria-expanded", String(aberto));
    menu.querySelector(".detalhes").hidden = !aberto;
  });

  menu.querySelectorAll(".detalhes a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("menu-aberto");
      botao.setAttribute("aria-expanded", "false");
      menu.querySelector(".detalhes").hidden = true;
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  configurarMenuResponsivo();

  if (document.querySelector(".container-cards")) {
    adicionarCliqueNasBandeiras();
  }

  if (document.getElementById("detalhes-selecao")) {
    preencherDetalhesDoPersonagem();
  }
});
