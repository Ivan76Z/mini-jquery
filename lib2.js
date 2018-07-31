//----------------------------------------------------------------
// Сама функция с эффектом chaining methods
// Вызов: create('tag .class #id') или create('tag .class') 
// или create('tag  #id') без класса
function create(args) {
  // Два пробела если не хотите class, а только id
  // 
  [this.tag, this.className, this.id] = args.split(' ')
  // Создание элемента
  this.elem = document.createElement(this.tag)
  if (this.className) { // 
    this.elem.className = this.className.replace(/\./, '')
  }
  if (this.id) { // 
    this.elem.id = this.id.replace(/\#/, '')
  }
  // appendTo 
  this.appendTo = function(s) {
    document.querySelector(s).appendChild(this.elem);
    return this;
  }
  // css function
  this.css = function({ ...args
  } = {}) {
    var s = ''
    Object.keys(args).forEach(function(v) {
      s += `${v}:${args[v]};`
    })
    this.elem.style = s
    return this;
  }
  // find element
  this.find = function(needle) {
    this.found = this.elem.parentNode.querySelectorAll(needle)
    return this
  }
  // destory if has found then found otherwise 
  this.destroy = function() {
    if (this.found && this.found.length > 0) {
      this.found.forEach(function(v, i) {
        this.elem.parentNode.removeChild(v)
      })

      //this.elem.parentNode.removeChild(this.found)
    } else
      this.elem.parentNode.removeChild(this.elem)
    return this
  }
  // text function....
  this.text = function(t) {
    this.elem.innerText = t
    return this
  }
  return this;
}
