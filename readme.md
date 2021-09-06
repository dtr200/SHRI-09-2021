# 1. Тайная жизнь игрушек
Плюшевый медвежонок Фёдор живет на полке в магазине. Он мечтает попасть к какому-нибудь мальчику или девочке, но уже несколько месяцев его никто не покупает.
  
Фёдор решил сделать интернет-магазин. Как известно, в интернете очень много людей. Если сделать сайт и разместить там свою фотографию, то какой-нибудь ребенок сразу купит его и заберет к себе домой.
  
К сожалению, плюшевые медведи не знают HTML и CSS. Пожалуйста, помогите Фёдору сверстать каталог товаров для его магазина!

### Примечания
Скачайте материалы задания. В архиве находятся макеты с пояснениями и заготовка файла html для отладки.

Сверстайте макеты адаптивно, т.е. таким образом, чтобы ваша вёрстка для каждого из размеров соответствовала нужному макету.

Размеры блоков:

* все фиксированные размеры на странице должны быть кратны 12px (проверяйте по сетке, добавив к тэгу body класс grid);
* область для контента должна быть выровнена по центру страницы. Максимальная ширина — 960px;
* блоки, размещенные в две или три колонки, должны иметь одинаковую ширину относительно друг друга и суммарно занимать всю доступную ширину.
  
Обратите внимание:  

* для текста нужно использовать шрифт Example-font (он уже подключен на отладочную страницу);
* используйте в вёрстке цвета, указанные на отладочной странице;
* в качестве заглушки для картинок используйте inline-изображение data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkMAYAADkANVKH3ScAAAAASUVORK5CYII=
**В качестве решения предоставьте содержимое тэга body (разметку и стили).**

# 2. Проблема цифрового кочевника Джо
Цифровой кочевник Джо оказался не готов к магнитной буре. Теперь в его файловой системе творится настоящая неразбериха.
  
Джо — минималист, поэтому всегда все файлы называл file и использовал собственную асинхронную файловую систему, которая базировалась на объекте Folder c двумя методами:


type File = string | Folder | {} | null | undefined;  
  
type Folder = {  
  // Получить по индексу файл или папку    
  read(index: number, callback: (file: File) => void): void;  
    
  // Получить количество элементов в директории     
  size(callback: (size: number) => void): void;  
}  
  
Часть файлов осталась неповрежденной, часть потеряна навсегда — превратилась в null или {}, а еще часть повреждена, но, кажется, может быть восстановлена. Понять, что файл поврежден, очень просто — часть букв в названии дублируется. Помогите цифровому кочевнику Джо найти все такие файлы и сложите их в массив для дальнейшего анализа. Массив надо отсортировать лексикографически.

### Формат ввода
Объект с определенной структурой:

Folder([    
    'file',    
    'ffffile',    
    Folder([    
        'file',    
    ]),    
    Folder([    
        'fiiile',    
    ]),    
    Folder([    
        {},    
        null,    
        'file',    
        'ffiillee',    
        'ffiillee',    
    ]),    
    Folder([    
        Folder([    
            'filllle',    
            'file',    
            null,    
        ]),    
        {},    
        Folder([]),    
    ]),    
]);    

### Формат вывода
Массив строк, отсортированный в лексикографическом порядке:

[  
    'ffffile',      
    'ffiillee',      
    'ffiillee',      
    'fiiile',      
    'filllle',      
]  

# 3. Вертлявые числа
Ботаник Вадим Сергеевич вернулся из отпуска и понял, что забыл пароль от защищенного раздела, который он создал перед отъездом. Восстановить доступ к разделу он может, только перебрав все возможные варианты паролей.
  
Он помнит только, как сидел, смотрел на небо и внезапно подумал, что 7 и 11 — интересные числа, они оба простые и в то же время отличаются на 2 от 3<sup>2</sup>. И что пароль он собирал как раз из этих чисел. Но чтобы никто не догадался, он взял 7, 711 и 1111.
  
Помогите, пожалуйста, Вадиму Сергеевичу отбраковать числа, которые не подходят под это условие.

### Пример 1

#### Ввод	
"7"

#### Вывод
true

### Пример 2

#### Ввод	
"77"

#### Вывод
true

### Пример 3

#### Ввод	
"71"

#### Вывод
false

### Формат ввода
Строка из цифр без ведущих нулей, 1 ≤ n ≤ 10+e20.

### Формат вывода
Верните true, если n может быть паролем Вадима, в противном случае верните false.

# 4. Межцивилизационный телеграф
Гуманоид Коля хочет как можно быстрее и громче передать сигнал Ксеноморфу Васе на другую планету. Ксеноморфы не умеют читать на языке Коли, и Вася не исключение, поэтому придется использовать специальную Ксеноморфную азбуку из 9 символов.
  
Передача каждого символа Ксеноморфов не бесплатна и стоит сколько-то динаров. Количество динаров у Коли и стоимость передачи каждого символа будут известны в межпланетном телеграфном пункте.
  
Коля не сильно понимает значения символов Ксеноморфов, но почему-то считает, что чем больше разных символов он отправит и большее количество динаров заплатит за их передачу — тем быстрее Вася получит сигнал.
  
Помогите Коле найти такие индексы символов, соединив которые конкатенацией мы получим максимальное число, потратив максимальное кол-во динар. Индекс — число от 1 до 9. Ответ ожидается в виде строки с индексами, которые могут повторяться.

### Пример 1

#### Ввод	
[5,[5,4,3,2,1,2,3,4,5]]

#### Вывод
'5555'

### Пример 2

#### Ввод	
[2,[9,11,1,12,5,8,9,10,6]]

#### Вывод
'33'

### Пример 3

#### Ввод	
[0,[1,1,1,1,1,1,1,1,1]]

#### Вывод
''

### Формат ввода
Первый аргумент — целое число dinars (0 ≤ dinars ≤ 10<sup>3</sup>). Второй аргумент — массив из девяти положительных целых чисел a1, a2, ..., a9 (1 ≤ ai ≤ 10<sup>2</sup>).

### Формат вывода
Строка с индексами. Если динаров у Коли не хватает ни на один символ, верните пустую строку.