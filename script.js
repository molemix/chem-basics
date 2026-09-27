const app = document.getElementById('app');
let current = -1;
let score = 0;
let checked = false;

const tasks = [
  {
    type:'drag', title:'Распредели вещества по классам', shuffle:true,
    items:['Fe','Al','S','P','CuO','SO₃','NaOH','Fe(OH)₃','H₂SO₄','HCl','HNO₃','H₃PO₄','K₂CO₃','CaCl₂','Na₂SO₄','Cu(NO₃)₂'],
    zones:['Металлы','Неметаллы','Оксиды','Основания','Кислоты','Соли'],
    answer:{'Fe':'Металлы','Al':'Металлы','S':'Неметаллы','P':'Неметаллы','CuO':'Оксиды','SO₃':'Оксиды','NaOH':'Основания','Fe(OH)₃':'Основания','H₂SO₄':'Кислоты','HCl':'Кислоты','HNO₃':'Кислоты','H₃PO₄':'Кислоты','K₂CO₃':'Соли','CaCl₂':'Соли','Na₂SO₄':'Соли','Cu(NO₃)₂':'Соли'}
  },
  {
    type:'drag', title:'Распредели оксиды по типам', cols:4,
    items:['CO','Al₂O₃','Na₂O','SO₃','ZnO','CaO','NO','P₂O₅','CuO','CO₂'],
    zones:['Основные','Кислотные','Амфотерные','Несолеобразующие'],
    answer:{'Na₂O':'Основные','CaO':'Основные','CuO':'Основные','SO₃':'Кислотные','CO₂':'Кислотные','P₂O₅':'Кислотные','Al₂O₃':'Амфотерные','ZnO':'Амфотерные','CO':'Несолеобразующие','NO':'Несолеобразующие'}
  },
  {
    type:'drag', title:'Распредели вещества по типу химической связи', cols:4,
    items:['HBr','Ag','Na₂O','F₂','K₂S','PH₃','Zn','O₂','CaCl₂','P₄','Mg','H₂S'],
    zones:['Ионная','Ковалентная полярная','Ковалентная неполярная','Металлическая'],
    answer:{'HBr':'Ковалентная полярная','Ag':'Металлическая','Na₂O':'Ионная','F₂':'Ковалентная неполярная','K₂S':'Ионная','PH₃':'Ковалентная полярная','Zn':'Металлическая','O₂':'Ковалентная неполярная','CaCl₂':'Ионная','P₄':'Ковалентная неполярная','Mg':'Металлическая','H₂S':'Ковалентная полярная'}
  },
  {
    type:'drag', title:'Распредели вещества по типу кристаллической решётки', cols:4,
    items:['CuSO₄','Br₂','SiO₂','Mg','KBr','HCl','C(алмаз)','Ag','BaO','H₂O','Si','CaCl₂','Fe','NH₃','Na₂S','Al'],
    zones:['Ионная','Молекулярная','Атомная','Металлическая'],
    answer:{'CuSO₄':'Ионная','Br₂':'Молекулярная','SiO₂':'Атомная','Mg':'Металлическая','KBr':'Ионная','HCl':'Молекулярная','C(алмаз)':'Атомная','Ag':'Металлическая','BaO':'Ионная','H₂O':'Молекулярная','Si':'Атомная','CaCl₂':'Ионная','Fe':'Металлическая','NH₃':'Молекулярная','Na₂S':'Ионная','Al':'Металлическая'}
  },
  {
    type:'atomTable', title:'Определи состав атома',
    rows:[['²³₁₁Na',11,12,11],['²⁷₁₃Al',13,14,13],['³⁵₁₇Cl',17,18,17],['⁴⁰₂₀Ca',20,20,20],['⁵⁶₂₆Fe',26,30,26],['³²₁₆S',16,16,16]]
  },
  {
    type:'atomScheme', title:'Определи группу и период по схеме атома',
    atoms:[{levels:[2,1],group:1,period:2},{levels:[2,6],group:6,period:2},{levels:[2,8,3],group:3,period:3},{levels:[2,8,7],group:7,period:3}]
  },
  {
    type:'oxidationInputs', title:'Определи степени окисления всех элементов',
    formulas:[
      {tokens:[['H','₂',1],['S','',-2]]},
      {tokens:[['Na','₂',1],['O','',-2]]},
      {tokens:[['H','',1],['N','',5],['O','₃',-2]]},
      {tokens:[['Fe','₂',3],['O','₃',-2]]},
      {tokens:[['Ca','',2],['O','',-2,'('],['H','',1,'',')₂']], display:'Ca(OH)₂'},
      {tokens:[['K','₂',1],['S','',6],['O','₄',-2]]}
    ]
  },
  {
    type:'matching', title:'Соедини вещество со степенью окисления выделенного элемента',
    left:[['NH₃','N'],['H₂S','S'],['H₂O₂','O'],['Cl₂','Cl'],['Cu₂O','Cu'],['Fe₂O₃','Fe'],['HNO₃','N'],['HClO₄','Cl']],
    right:['+5','−1','+3','−3','+7','0','−2','+1'],
    answer:{0:'−3',1:'−2',2:'−1',3:'0',4:'+1',5:'+3',6:'+5',7:'+7'}
  },
  {
    type:'naming', title:'Напиши название вещества по формуле', hint:true,
    rows:[
      ['Fe₂O₃',['оксид железа(iii)','оксид железа iii','оксид железа 3']],
      ['Cu(OH)₂',['гидроксид меди(ii)','гидроксид меди ii','гидроксид меди 2']],
      ['H₂SO₃',['сернистая кислота']],
      ['Na₂CO₃',['карбонат натрия']],
      ['AlCl₃',['хлорид алюминия']],
      ['SO₂',['оксид серы(iv)','оксид серы iv','оксид серы 4']],
      ['Ca₃(PO₄)₂',['фосфат кальция']],
      ['Fe(OH)₃',['гидроксид железа(iii)','гидроксид железа iii','гидроксид железа 3']],
      ['CuSO₄',['сульфат меди(ii)','сульфат меди ii','сульфат меди 2']],
      ['K₂S',['сульфид калия']],
      ['HNO₃',['азотная кислота']],
      ['Mg(NO₃)₂',['нитрат магния']]
    ]
  },
  {
    type:'levels', title:'Распредели электроны по энергетическим уровням',
    rows:[['Na',11,[2,8,1]],['Mg',12,[2,8,2]],['Cl',17,[2,8,7]],['Ar',18,[2,8,8]],['K',19,[2,8,8,1]],['Ca',20,[2,8,8,2]]]
  },
  {
    type:'config', title:'Запиши электронную конфигурацию атома',
    rows:[['O','1s2 2s2 2p4'],['Cl','1s2 2s2 2p6 3s2 3p5']]
  },
];

function start(){ current=0; score=0; renderTask(); }
function renderStart(){ app.innerHTML = document.getElementById('start-template').innerHTML; app.querySelector('[data-action=start]').onclick=start; }
function shell(task){
  return `<div class="progress-wrap"><div class="progress-track"><div class="progress-bar" style="width:${(current/tasks.length)*100}%"></div></div></div>
  <section class="task-shell"><div class="task-kicker">Задание ${current+1} из ${tasks.length}</div>
  <div class="task-title-row"><h2 class="task-title">${task.title}</h2>${task.hint?hintMarkup():''}</div>
  <div class="task-body" id="taskBody"></div><div id="feedback"></div>
  <div class="task-actions"><button class="primary-btn" id="checkBtn">Проверить</button></div></section>`;
}
function hintMarkup(){return `<span class="hint-wrap"><button class="hint-btn" type="button" aria-label="Подсказка">?</button><span class="hint-pop"><b>Указывай римской цифрой</b> валентность элементов с переменной валентностью: Fe, Cu, Cr, Mn, Co, Ni, Sn, Pb. В оксидах неметаллов также указывай степень окисления, если она может быть разной: S, N, P, Cl.</span></span>`}
function renderTask(){ checked=false; const t=tasks[current]; app.innerHTML=shell(t); const body=document.getElementById('taskBody'); if(t.hint){const h=document.querySelector('.hint-wrap');document.querySelector('.hint-btn').onclick=()=>h.classList.toggle('open')}
  const renderers={drag:renderDrag,atomTable:renderAtomTable,atomScheme:renderAtomScheme,oxidationInputs:renderOx,matching:renderMatching,naming:renderNaming,levels:renderLevels,config:renderConfig,identifyConfig:renderIdentify}; renderers[t.type](t,body); document.getElementById('checkBtn').onclick=()=>checkCurrent(t); }
function setFeedback(ok,msg=''){ const f=document.getElementById('feedback'); f.innerHTML=`<div class="feedback ${ok?'good':'bad'}">${ok?'Верно!':(msg||'Есть ошибки. Посмотри разбор и переходи дальше.')}</div>`; const actions=document.querySelector('.task-actions'); document.getElementById('checkBtn').remove(); const next=document.createElement('button'); next.className='primary-btn'; next.textContent=current===tasks.length-1?'Результат':'Дальше'; next.onclick=()=>{current++; current>=tasks.length?renderFinal():renderTask()}; actions.appendChild(next); }
function lock(){ app.querySelectorAll('input,select,button.chip,.match-item').forEach(el=>{if(el.tagName==='INPUT'||el.tagName==='SELECT')el.disabled=true; else el.style.pointerEvents='none'}); }
function normalize(s){return s.trim().toLowerCase().replace(/ё/g,'е').replace(/\s+/g,' ').replace(/\s*\(\s*/g,'(').replace(/\s*\)\s*/g,')')}

function shuffleArray(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}

function renderDrag(t,b){ b.innerHTML=`<div class="chips-bank" id="bank"></div><div class="drop-grid ${t.cols?'cols-4':''}">${t.zones.map(z=>`<div class="drop-zone" data-zone="${z}"><h3>${z}</h3><div class="zone-items"></div></div>`).join('')}</div>`; const bank=b.querySelector('#bank'); const items=t.shuffle?shuffleArray(t.items):t.items; items.forEach(it=>bank.appendChild(makeChip(it))); b.querySelectorAll('.drop-zone').forEach(z=>{z.addEventListener('dragover',e=>{e.preventDefault();z.classList.add('dragover')});z.addEventListener('dragleave',()=>z.classList.remove('dragover'));z.addEventListener('drop',e=>{e.preventDefault();z.classList.remove('dragover');const id=e.dataTransfer.getData('text/plain');const c=document.querySelector(`[data-item-id="${CSS.escape(id)}"]`); if(c)z.querySelector('.zone-items').appendChild(c)});z.onclick=e=>{const s=document.querySelector('.chip.selected');if(s&&!e.target.closest('.chip')){z.querySelector('.zone-items').appendChild(s);s.classList.remove('selected')}}}); bank.onclick=e=>{const s=e.target.closest('.chip'); if(s&&s.parentElement!==bank){bank.appendChild(s);s.classList.remove('selected')}} }
function makeChip(text){const c=document.createElement('button');c.className='chip';c.type='button';c.textContent=text;c.draggable=true;c.dataset.itemId=text;c.addEventListener('dragstart',e=>e.dataTransfer.setData('text/plain',text));c.onclick=e=>{e.stopPropagation();document.querySelectorAll('.chip.selected').forEach(x=>x!==c&&x.classList.remove('selected'));c.classList.toggle('selected')};return c}
function checkDrag(t){let ok=true; document.querySelectorAll('.chip').forEach(c=>{const z=c.closest('.drop-zone')?.dataset.zone; const good=z===t.answer[c.dataset.itemId]; c.classList.add(good?'correct':'incorrect'); if(!good)ok=false}); if(document.querySelector('#bank .chip'))ok=false; return ok}

function renderAtomTable(t,b){b.innerHTML=`<div class="table-wrap"><table class="entry-table"><thead><tr><th>Атом</th><th>p⁺</th><th>n⁰</th><th>e⁻</th></tr></thead><tbody>${t.rows.map((r,i)=>`<tr><td>${r[0]}</td>${[1,2,3].map(j=>`<td><input class="small-input" inputmode="numeric" data-r="${i}" data-c="${j}" aria-label="${r[0]} ${['','протоны','нейтроны','электроны'][j]}"></td>`).join('')}</tr>`).join('')}</tbody></table></div>`}
function checkAtomTable(t){let ok=true;bq('.small-input').forEach(inp=>{const ans=t.rows[+inp.dataset.r][+inp.dataset.c];const good=Number(inp.value)===ans;mark(inp,good);if(!good)ok=false});return ok}
function bq(sel){return [...document.querySelectorAll(sel)]}
function mark(el,good){el.classList.add(good?'correct':'incorrect')}

function renderAtomScheme(t,b){b.innerHTML=`<div class="atom-grid">${t.atoms.map((a,i)=>`<div class="atom-card">${atomSvg(a.levels)}<div class="choice-row"><div class="choice-group"><label>Группа</label><select data-ai="${i}" data-k="group"><option value="">—</option>${[1,2,3,4,5,6,7,8].map(n=>`<option>${n}</option>`).join('')}</select></div><div class="choice-group"><label>Период</label><select data-ai="${i}" data-k="period"><option value="">—</option>${[1,2,3,4].map(n=>`<option>${n}</option>`).join('')}</select></div></div></div>`).join('')}</div>`}
function atomSvg(levels){const cx=120,cy=120,radii=[38,68,98];let s=`<svg class="atom-svg" viewBox="0 0 240 240" aria-label="Схема атома"><circle class="nucleus" cx="120" cy="120" r="18"/>`;levels.forEach((count,li)=>{const r=radii[li];s+=`<circle class="shell" cx="120" cy="120" r="${r}"/>`;for(let j=0;j<count;j++){const ang=(-90+(360/count)*j)*Math.PI/180;const x=cx+r*Math.cos(ang),y=cy+r*Math.sin(ang);s+=`<circle class="electron" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.2"/>`}});return s+'</svg>'}
function checkAtomScheme(t){let ok=true;bq('.choice-group select').forEach(sel=>{const a=t.atoms[+sel.dataset.ai];const good=Number(sel.value)===a[sel.dataset.k];mark(sel,good);if(!good)ok=false});return ok}

function renderOx(t,b){b.innerHTML=`<div class="ox-grid">${t.formulas.map((f,fi)=>`<div class="ox-card"><div class="formula-tokens">${f.tokens.map((tok,ti)=>`<span class="formula-token"><input class="ox-input" data-fi="${fi}" data-ti="${ti}" aria-label="Степень окисления ${tok[0]}">${tok[3]?`<span class="formula-bracket prefix">${tok[3]}</span>`:''}<span>${tok[0]}</span>${tok[1]?`<span class="sub">${tok[1]}</span>`:''}${tok[4]?`<span class="formula-bracket suffix">${tok[4]}</span>`:''}</span>`).join('')}</div></div>`).join('')}</div>`}
function parseOx(v){return Number(v.trim().replace('−','-').replace('+',''))}
function checkOx(t){let ok=true;bq('.ox-input').forEach(inp=>{const ans=t.formulas[+inp.dataset.fi].tokens[+inp.dataset.ti][2];const good=parseOx(inp.value)===ans;mark(inp,good);if(!good)ok=false});return ok}

let matchPairs={};let matchActive=null;const lineColors=['#88a85c','#7e9fbe','#b989b5','#c79a66','#7ba898','#a184bf','#9d9f67','#be817d'];
function renderMatching(t,b){matchPairs={};matchActive=null;b.innerHTML=`<div class="match-area" id="matchArea"><svg class="match-svg" id="matchSvg"></svg><div class="match-col">${t.left.map((x,i)=>`<button class="match-item left" data-li="${i}">${x[0]} — ${x[1]}</button>`).join('')}</div><div class="match-col">${t.right.map((x,i)=>`<button class="match-item right" data-rv="${x}">${x}</button>`).join('')}</div></div>`;bq('.match-item.left').forEach(x=>x.onclick=()=>{bq('.match-item.left').forEach(q=>q.classList.remove('active'));x.classList.add('active');matchActive=+x.dataset.li});bq('.match-item.right').forEach(x=>x.onclick=()=>{if(matchActive===null)return;for(const k in matchPairs)if(matchPairs[k]===x.dataset.rv)delete matchPairs[k];matchPairs[matchActive]=x.dataset.rv;matchActive=null;bq('.match-item.left').forEach(q=>q.classList.remove('active'));drawLines()});window.addEventListener('resize',drawLines,{once:true})}
function drawLines(){const area=document.getElementById('matchArea'),svg=document.getElementById('matchSvg');if(!area||!svg)return;const ar=area.getBoundingClientRect();svg.innerHTML='';Object.entries(matchPairs).forEach(([li,rv],idx)=>{const l=document.querySelector(`[data-li="${li}"]`),r=[...document.querySelectorAll('.match-item.right')].find(x=>x.dataset.rv===rv);if(!l||!r)return;const a=l.getBoundingClientRect(),bb=r.getBoundingClientRect();const line=document.createElementNS('http://www.w3.org/2000/svg','line');line.setAttribute('x1',a.right-ar.left);line.setAttribute('y1',a.top+a.height/2-ar.top);line.setAttribute('x2',bb.left-ar.left);line.setAttribute('y2',bb.top+bb.height/2-ar.top);line.setAttribute('stroke',lineColors[+li%lineColors.length]);svg.appendChild(line)})}
function checkMatching(t){let ok=true;t.left.forEach((_,i)=>{const l=document.querySelector(`[data-li="${i}"]`);const good=matchPairs[i]===t.answer[i];l.classList.add(good?'correct':'incorrect');if(!good)ok=false});bq('.match-item.right').forEach(r=>{const li=Object.keys(matchPairs).find(k=>matchPairs[k]===r.dataset.rv);if(li!==undefined)r.classList.add(matchPairs[li]===t.answer[li]?'correct':'incorrect')});return ok}

function renderNaming(t,b){b.innerHTML=`<div class="naming-list">${t.rows.map((r,i)=>`<div class="name-row"><div class="formula-label">${r[0]}</div><input class="text-input" data-ni="${i}" placeholder="Введите название" autocomplete="off"></div>`).join('')}</div>`}
function checkNaming(t){let ok=true;bq('[data-ni]').forEach(inp=>{const variants=t.rows[+inp.dataset.ni][1].map(normalize);const good=variants.includes(normalize(inp.value));mark(inp,good);if(!good)ok=false});return ok}

function renderLevels(t,b){b.innerHTML=`<div class="level-grid">${t.rows.map((r,i)=>`<div class="level-card"><strong>${r[0]}</strong><div class="levels-inputs">${r[2].map((_,j)=>`${j?'<span class="separator">—</span>':''}<input class="small-input" inputmode="numeric" data-lr="${i}" data-lc="${j}" aria-label="Уровень ${j+1}">`).join('')}</div></div>`).join('')}</div>`}
function checkLevels(t){let ok=true;bq('[data-lr]').forEach(inp=>{const good=Number(inp.value)===t.rows[+inp.dataset.lr][2][+inp.dataset.lc];mark(inp,good);if(!good)ok=false});return ok}
function renderConfig(t,b){b.innerHTML=`<div class="config-list">${t.rows.map((r,i)=>`<div class="config-row"><div class="formula-label">${r[0]}</div><input class="text-input" data-ci="${i}" placeholder="Например: 1s2 2s2 2p6" autocomplete="off"></div>`).join('')}</div>`}
function normConfig(s){return s.toLowerCase().replace(/[²]/g,'2').replace(/[³]/g,'3').replace(/[⁴]/g,'4').replace(/[⁵]/g,'5').replace(/[⁶]/g,'6').replace(/[⁷]/g,'7').replace(/[⁸]/g,'8').replace(/[⁹]/g,'9').replace(/[¹]/g,'1').replace(/[⁰]/g,'0').replace(/\s+/g,' ').trim()}
function checkConfig(t){let ok=true;bq('[data-ci]').forEach(inp=>{const good=normConfig(inp.value)===normConfig(t.rows[+inp.dataset.ci][1]);mark(inp,good);if(!good)ok=false});return ok}
function renderIdentify(t,b){b.innerHTML=`<div class="config-list">${t.rows.map((r,i)=>`<div class="config-row"><div class="formula-label">${r[0]}</div><input class="text-input" data-ii="${i}" placeholder="Символ или название элемента" autocomplete="off"></div>`).join('')}</div>`}
function checkIdentify(t){let ok=true;bq('[data-ii]').forEach(inp=>{const r=t.rows[+inp.dataset.ii];const good=[r[1],r[2]].map(normalize).includes(normalize(inp.value));mark(inp,good);if(!good)ok=false});return ok}


function esc(s){return String(s).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]))}
function signed(n){return n>0?'+'+n:String(n).replace('-','−')}
function zoneWhy(taskIndex,zone,item){
  if(taskIndex===0){
    const m={
      'Металлы':'это простое вещество, состоящее из атомов металла.',
      'Неметаллы':'это простое вещество, состоящее из атомов неметалла.',
      'Оксиды':'это сложное вещество из двух элементов, один из которых кислород.',
      'Основания':'в составе есть атом металла и гидроксогруппа OH.',
      'Кислоты':'формула содержит атомы водорода и кислотный остаток.',
      'Соли':'вещество состоит из катиона металла и кислотного остатка.'};return m[zone]||'';
  }
  if(taskIndex===1){const m={'Основные':'оксид металла с основными свойствами.','Кислотные':'оксид проявляет кислотные свойства и соответствует кислоте.','Амфотерные':'оксид реагирует и с кислотами, и со щелочами.','Несолеобразующие':'оксид не образует соответствующую соль при обычных кислотно-основных реакциях.'};return m[zone]||''}
  if(taskIndex===2){const m={'Ионная':'связь возникает между ионами, обычно в соединении металла с неметаллом.','Ковалентная полярная':'общая электронная пара смещена к более электроотрицательному атому.','Ковалентная неполярная':'электронная пара распределена практически равномерно между одинаковыми или близкими по электроотрицательности атомами.','Металлическая':'это простое вещество-металл с металлической связью.'};return m[zone]||''}
  if(taskIndex===3){const m={'Ионная':'в узлах решётки находятся ионы.','Молекулярная':'в узлах решётки находятся молекулы.','Атомная':'в узлах решётки находятся атомы, связанные прочными ковалентными связями.','Металлическая':'в узлах решётки находятся положительные ионы металла, между ними — обобществлённые электроны.'};return m[zone]||''}
  return '';
}
function namingWhy(formula){
  if(/^H/.test(formula) && !formula.includes('OH')) return 'это кислота, поэтому используется традиционное название кислоты.';
  if(formula.includes('(OH)')) return 'это основание: называем «гидроксид» и металл; для металла переменной валентности указываем её.';
  if(/O/.test(formula) && !/[()]/.test(formula) && !formula.includes('NO₃') && !formula.includes('SO₄') && !formula.includes('CO₃')) return 'это оксид: называем «оксид» и элемент; при переменной валентности указываем её.';
  return 'это соль: называем кислотный остаток, затем металл; при переменной валентности металла указываем её.';
}
function oxidationWhy(formula, element, value){
  const special={
    'H₂S':{'H':'H обычно имеет +1.','S':'2·(+1) + x = 0, поэтому S = −2.'},
    'Na₂O':{'Na':'O = −2, поэтому 2x − 2 = 0 и Na = +1.','O':'в большинстве оксидов кислород имеет −2.'},
    'HNO₃':{'H':'в кислотах H обычно +1.','N':'(+1) + x + 3·(−2) = 0, поэтому N = +5.','O':'кислород здесь имеет −2.'},
    'Fe₂O₃':{'Fe':'2x + 3·(−2) = 0, поэтому Fe = +3.','O':'в обычных оксидах O = −2.'},
    'Ca(OH)₂':{'Ca':'две группы OH имеют суммарный заряд −2, поэтому Ca = +2.','O':'в гидроксогруппе O = −2.','H':'в гидроксогруппе H = +1.'},
    'K₂SO₄':{'K':'щелочной металл K всегда имеет +1.','S':'2·(+1) + x + 4·(−2) = 0, поэтому S = +6.','O':'кислород в сульфате имеет −2.'}
  };
  return special[formula]?.[element] || `сумма степеней окисления в нейтральном веществе равна 0, поэтому ${element} = ${signed(value)}.`;
}
function matchingWhy(i){
  const reasons={
    0:'в NH₃ водород имеет +1: x + 3·(+1) = 0, поэтому N = −3.',
    1:'в H₂S водород имеет +1: 2·(+1) + x = 0, поэтому S = −2.',
    2:'H₂O₂ — пероксид, поэтому кислород имеет исключительную степень окисления −1.',
    3:'Cl₂ — простое вещество, поэтому степень окисления Cl равна 0.',
    4:'в Cu₂O кислород −2: 2x − 2 = 0, поэтому Cu = +1.',
    5:'в Fe₂O₃ кислород −2: 2x + 3·(−2) = 0, поэтому Fe = +3.',
    6:'в HNO₃ H = +1, O = −2: 1 + x − 6 = 0, поэтому N = +5.',
    7:'в HClO₄ H = +1, O = −2: 1 + x − 8 = 0, поэтому Cl = +7.'
  };
  return reasons[i] || 'степень окисления находится из условия, что сумма степеней окисления в нейтральной частице равна 0.';
}
function levelWhy(levelIndex, answer){
  if(levelIndex===0)return `первый энергетический уровень вмещает максимум 2 электрона, здесь на нём ${answer}.`;
  return `электроны распределяются от внутренних уровней к внешним; на ${levelIndex+1}-м уровне должно быть ${answer}.`;
}
function detailedFeedback(t){
  const lines=[];
  if(t.type==='drag'){
    bq('.chip.incorrect').forEach(c=>{
      const item=c.dataset.itemId, correct=t.answer[item];
      lines.push(`<b>${esc(item)} → ${esc(correct)}</b>: ${esc(zoneWhy(current,correct,item))}`);
    });
  } else if(t.type==='atomTable'){
    bq('.small-input.incorrect').forEach(inp=>{
      const r=t.rows[+inp.dataset.r],c=+inp.dataset.c;
      const labels=['','p⁺','n⁰','e⁻'];
      let why='';
      if(c===1)why=`порядковый номер Z = ${r[1]}, поэтому протонов ${r[1]}.`;
      if(c===2)why=`n = A − Z = ${r[1]+r[2]} − ${r[1]} = ${r[2]}.`;
      if(c===3)why=`атом нейтральный, поэтому число электронов равно числу протонов: ${r[3]}.`;
      lines.push(`<b>${r[0]}: ${labels[c]} = ${r[c]}</b>: ${why}`);
    });
  } else if(t.type==='atomScheme'){
    bq('.choice-group select.incorrect').forEach(sel=>{
      const a=t.atoms[+sel.dataset.ai];
      if(sel.dataset.k==='group') lines.push(`<b>Группа = ${a.group}</b>: на внешнем уровне ${a.group} электрон(а/ов); для элементов главных подгрупп это соответствует номеру группы.`);
      else lines.push(`<b>Период = ${a.period}</b>: на схеме видно ${a.period} электронных уровня, а число уровней равно номеру периода.`);
    });
  } else if(t.type==='oxidationInputs'){
    bq('.ox-input.incorrect').forEach(inp=>{
      const f=t.formulas[+inp.dataset.fi],tok=f.tokens[+inp.dataset.ti];
      const formula=f.display||f.tokens.map(x=>x[0]+(x[1]||'')).join('');
      lines.push(`<b>${formula}: ${tok[0]} = ${signed(tok[2])}</b>: ${oxidationWhy(formula,tok[0],tok[2])}`);
    });
  } else if(t.type==='matching'){
    t.left.forEach((x,i)=>{
      const el=document.querySelector(`[data-li="${i}"]`);
      if(el?.classList.contains('incorrect')) lines.push(`<b>${x[0]}: ${x[1]} = ${t.answer[i]}</b>: ${matchingWhy(i)}`);
    });
  } else if(t.type==='naming'){
    bq('[data-ni].incorrect').forEach(inp=>{
      const r=t.rows[+inp.dataset.ni],answer=r[1][0];
      lines.push(`<b>${r[0]} — ${answer}</b>: ${namingWhy(r[0])}`);
    });
  } else if(t.type==='levels'){
    bq('[data-lr].incorrect').forEach(inp=>{
      const ri=+inp.dataset.lr, li=+inp.dataset.lc, r=t.rows[ri],ans=r[2][li];
      lines.push(`<b>${r[0]}, ${li+1}-й уровень = ${ans}</b>: ${levelWhy(li,ans)}`);
    });
  } else if(t.type==='config'){
    bq('[data-ci].incorrect').forEach(inp=>{
      const r=t.rows[+inp.dataset.ci];
      const total=(r[1].match(/\d+$/g)||[]);
      lines.push(`<b>${r[0]}: ${r[1]}</b>: орбитали заполняются по возрастанию энергии; сумма электронов в записи должна равняться порядковому номеру атома ${r[0]}.`);
    });
  } else if(t.type==='identifyConfig'){
    bq('[data-ii].incorrect').forEach(inp=>{
      const r=t.rows[+inp.dataset.ii];
      lines.push(`<b>${r[0]} → ${r[1]} (${r[2]})</b>: элемент определяется по общему числу электронов в конфигурации.`);
    });
  }
  if(!lines.length)return 'Есть ошибки. Посмотри правильные ответы.';
  return `<b>Разбор ошибок:</b><div class="feedback-details">${lines.map(x=>`<div class="feedback-line">${x}</div>`).join('')}</div>`;
}

function checkCurrent(t){if(checked)return;checked=true;const checks={drag:checkDrag,atomTable:checkAtomTable,atomScheme:checkAtomScheme,oxidationInputs:checkOx,matching:checkMatching,naming:checkNaming,levels:checkLevels,config:checkConfig,identifyConfig:checkIdentify};const ok=checks[t.type](t);if(ok)score++;lock();setFeedback(ok,ok?'':detailedFeedback(t))}

function renderFinal(){app.innerHTML=`<section class="screen-card final-screen"><div class="eyebrow">Результат</div><div class="score">${score} из ${tasks.length}</div><p>${score===tasks.length?'Отлично! Все задания выполнены верно.':'Хорошая база. Стоит повторить темы, где были ошибки.'}</p><button class="primary-btn" id="again">Пройти ещё раз</button></section>`;document.getElementById('again').onclick=start}
renderStart();
