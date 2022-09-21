const err = (v) => {
  throw v;
};
// production할때는 console.log로 변경. 이방법 많이씀.

const Task = class {
  constructor(title, isCompleted = false) {
    this.title = title;
    this.isCompleted = isCompleted;
  }
  setTitle(title) {
    this.title = title;
    // return new Task(title, this.isCompleted);
  }
  toggle() {
    this.isCompleted = !this.isCompleted;
    // return new Task(this.title, !this.isCompleted);
  }
  getInfo() {
    return { title: this.title, isCompleted: this.isCompleted };
  }
  // isEqual(task) {
  //   return task.title === this.title && task.isCompleted === this.isCompleted;
  // }
};
() => {
  let isOkay = true;
  const task = new Task('test1');
  isOkay = task.getInfo().title === 'test1' && task.getInfo().isCompleted === false;
  console.log('test1', isOkay);
  task.toggle();
  isOkay = task.getInfo().title === 'test1' && task.getInfo().isCompleted === true;
  console.log('test2', isOkay);
};
// 상태값으로 boolean 안좋아. 그래서 일반적으로 열거형씀.
// 근데 자스는 없어. 그냥 클래스로 만들어
// 가변형에대한 의사결정. 값을가질지 객체를가질지.
// immutable은 참조 안전성. 다중 스레드에서 새객체니까 중복참조도 없어져. 값 컨텍스트
// mutable과 immutable은 처음에 정해야돼. 의사결정
// 객체의 실체는 값이 아니다. 메모리의 참조값.
// 값 컨텍스트 때문에
// 객체지향인데 this.id=uuid() 이런건 잘못된거야ㅣ
// 클래스 인스턴스도 값 컨텍스트를 따르도록 조종할 수 있다. 디자인이 중요한거야
// 객체지향에서 내장을 깔필요가 없어. 내장 까야된다면 잘못된 코드. ㅇ
// 호스트가 중요하지 객체는 중요하지 않다. 그냥 호스트한테 잘 가면된다.

const Folder = class {
  constructor(title) {
    this.title = title;
    this.tasks = new Set();
  }
  // addTask(title) {
  //   this.tasks.add(new Task(title));
  // }
  addTask(task) {
    if (!task instanceof Task) err('invalid task');
    this.tasks.add(task);
  }
  removeTask(task) {
    if (!task instanceof Task) err('invalid task');
    this.tasks.delete(task);
  }
  // 대칭성. 켄트백. add할때 title만받는데 remove할때 title만 받으면 이상해져.
  getTasks() {
    return [...this.tasks.values()];
  }
  // 범용적인 명사 동사 등은 프레임워크나 상위 개발자들이 만들어놓는다. 우리는 구체화된 변수명을 사용하자. ex) getList. but component는 도메인적인 맥락 제거하는게 좋을때도있음.
  getTitle() {
    return this.title;
  }
};
() => {
  let isOkay = true;
  const task = new Task('test1');
  const folder = new Folder('folder1');
  isOkay = folder.getTasks().length === 0;
  console.log('test1', isOkay);
  folder.addTask(task);
  isOkay = folder.getTasks().length === 1 && folder.getTasks()[0].getInfo().title === task.title;
  console.log('test2', isOkay);
  folder.addTask(task);
  isOkay = folder.getTasks().length === 1 && folder.getTasks()[0].getInfo().title === task.title;
  console.log('test3', isOkay);
};

const App = class {
  constructor() {
    this.folders = new Set();
  }
  addFolder(folder) {
    if (!folder instanceof Task) err('invalid task');
    this.folders.add(folder);
  }
  removeFolder(folder) {
    this.folders.delete(folder);
  }
  getFolders() {
    return [...this.folders.values()];
  }
};

const Renderer = class {
  constructor(app) {
    this.app = app;
  }
  render() {
    this._render();
  }
  _render() {
    throw err('must be overrided');
  }
};
const el = (tag) => document.createElement(tag);
const DomRenderer = class extends Renderer {
  constructor(parent, app) {
    super(app);
    this.el = parent.appendChild(el('section'));
    this.el.innerHTML = `
      <nav>
        <input type='text'/>
        <ul></ul>
      </nav>
      <section>
        <header>
          <h2></h2>
          <input type='text'/>
        </header>
        <ul></ul>
      </section>
    `;
    this.el.querySelector('nav').style.cssText = 'float:left; width:200px; border-right:1px solid #000;';
    this.el.querySelector('section').style.cssText = 'margin-left:210px;';
    const ul = this.el.querySelectorAll('ul');
    this.folder = ul[0];
    this.task = ul[1];
    this.currentFolder = null;
    const input = this.el.querySelectorAll('input');
    input[0].addEventListener('keyup', (e) => {
      if (e.keyCode !== 13) return;
      const v = e.target.value.trim();
      if (!v) return;
      // 쉴드패턴. 위에서 다 튕겨내고 아래는 동작하는 로직만있는거. 화이트 블랙처럼
      const folder = new Folder(v);
      this.app.addFolder(folder);
      e.target.value = '';
      this.render();
    });
    input[1].addEventListener('keyup', (e) => {
      if (e.keyCode !== 13 || !this.currentFolder) return;
      const v = e.target.value.trim();
      if (!v) return;
      const task = new Task(v);
      this.currentFolder.addTask(task);
      e.target.value = '';
      this.render();
    });
  }
  _render() {
    const folders = this.app.getFolders();
    if (!this.currentFolder) this.currentFolder = folders[0];
    this.folder.innerHTML = '';
    folders.forEach((folder) => {
      const li = el('li');
      li.innerHTML = folder.getTitle();
      li.style.cssText = `font-size: ${this.currentFolder === folder ? '20px' : '12px'}`;
      li.addEventListener('click', () => {
        this.currentFolder = folder;
        this.render();
      });
      this.folder.appendChild(li);
    });
    if (!this.currentFolder) return;
    this.task.innerHTML = '';
    this.currentFolder.getTasks().forEach((t) => {
      const li = el('li');
      const { title, isCompleted } = t.getInfo();
      li.innerHTML = (isCompleted ? 'completed ' : 'process ') + title;
      li.addEventListener('click', () => {
        t.toggle();
        this.render();
      });
      this.task.appendChild(li);
    });
  }
};

new DomRenderer(document.body, new App());
// 전체 렌더는 그냥 그리면 돼. 데이터만 다루는거야. 어차피 라이브러리들이 해주는거야 그거는.
