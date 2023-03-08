##### Table of content

- [TypeScript Basic](#typescript-basic)
  - [Type + JavaScript](#type--javascript)
  - [Type annotation](#type-annotation)
  - [Type inference](#type-inference)
  - [Kiểu dữ liệu Object](#kiểu-dữ-liệu-object)
  - [Kiểu dữ liệu Array](#kiểu-dữ-liệu-array)
  - [Kiểu dữ liệu Tuple](#kiểu-dữ-liệu-tuple)
  - [Kiểu dữ liệu enum](#kiểu-dữ-liệu-enum)
  - [Kiểu dữ liệu any](#kiểu-dữ-liệu-any)
  - [Kiểu dữ liệu void](#kiểu-dữ-liệu-void)
  - [Generics](#generics)
  - [Kiểu dữ liệu never (tà đạo - ít dùng)](#kiểu-dữ-liệu-never-tà-đạo---ít-dùng)
  - [Union Type](#union-type)
  - [Type Aliases và Interface](#type-aliases-và-interface)
  - [If Else, Switch Case, For Loop, While Loop, Do While](#if-else-switch-case-for-loop-while-loop-do-while)
  - [Function](#function)
  - [Function overloadings](#function-overloadings)
  - [Classes](#classes)
    - [Overview](#overview)
    - [Access Modifiers](#access-modifiers)
    - [readonly](#readonly)
    - [get, set](#get-set)
    - [Inheritance](#inheritance)
    - [override](#override)
    - [static](#static)
    - [abstract](#abstract)

# TypeScript Basic

## Type + JavaScript

- Đối với JavaScript là một dạng ngôn ngữ lập trình với dynamic typing, tức là khi chúng ta khai báo một biến thì chúng ta có thể gán giá trị cho biến đó tùy ý mà không cần phải quan tâm tới kiểu dữ liệu.
- Tuy nhiên điều này sẽ gây ra một bất lợi là chúng ta không thể nào kiểm soát được kiểu giá trị của biến đó, dẫn đến dễ sinh ra bugs trong quá trình code. Đặc biệt khi trong một dự án lớn thì việc vô tình làm thay đổi kiểu dữ liệu của biến sẽ gây ra rất nhiều phiền toái để trace và fix bug. Do đó TypeScript ra đời để khắc phục những vấn đề đó.
- TypeScript là "Type" + JavaScript, TS sử dụng các cú pháp của JavaScript và bổ sung thêm các cú pháp để hỗ trợ "type" (tức là định dạng kiểu dữ liệu cho một biến - static typing), do đó chúng ta có thể code JS một cách bình thường trong TS.
- Khi code TS, chúng ta sẽ code JS như thông thường tuy nhiên phải định nghĩa thêm kiểu dữ liệu cho các biến khi chúng ta
  khai báo, điều này có ích như sau:
  - Ép kiểu dữ liệu chặt chẽ hơn, nhằm tránh các bugs không mong muốn khi chúng ta vô tình thay đổi kiểu dữ liệu của biến.
  - Khi truyền sai kiểu dữ liệu IDE sẽ báo lỗi ngay lập tức không cần phải chạy mới gặp lỗi => ts sẽ check code để báo bug rất chặt chẽ.
  - IDE sẽ gợi ý các method cũng như property chuẩn hơn tùy thuộc vào kiểu dữ liệu của biến đó.
  - Giúp cho việc đọc code dễ dàng hơn, hiểu được biến đó thuộc kiểu dữ liệu gì hoặc có thể hiểu được data flow của một function,... từ đó dễ dàng hơn trong việc maintain và upgrade code.
- Ngoài ra TS còn hỗ trợ OOP mạnh mẽ hơn rất nhiều so với JS khi cung cấp các thuộc tính trong OOP như kế thừa, đóng gói,...
- Browser sẽ không chạy được TS nên chúng ta phải cần sử dụng TypeScript compiler. Chúng ta sẽ tải về hai thư viện typescript và ts-node từ npm.
- Trong thư viện typescript sẽ cung cấp trình biên dịch tsc để biên dịch ts thành js rồi sau đó sử dụng node để chạy file js như bình thường
  Câu lệnh: tsc index.ts
- Thư viện ts-node sẽ giúp chúng ta thực thi trực tiếp file ts mà không cần thiết phải compile sang file js.
  Câu lệnh: ts-node index.js

## Type annotation

- Type annotation là việc chúng ta gán kiểu dữ liệu cho một biến.

  Dữ liệu nguyên thủy

  ```
  let numberVariable: number = 10;
  let stringVariable: string = "Hello World";
  let booleanVariabel: boolean = true;
  let nullVariable: null = null;
  let undefinedVariable: undefined = undefined;
  let mixVariable: string | number | boolean = 22; // cách khai báo biến này sẽ chứa 1 trong 3 giá trị
  ```

  Dữ liệu kiểu tham chiếu

  ```
  let names: string[] = ["Phan", "Nguyen", "Thanh", "Nhan"]; // Định nghĩa kiểu dữ liệu array chỉ chứa string
  let ages: number[] = [19, 20, 21, 22]; // Định nghĩa kiểu dữ liệu array chỉ chứa number
  let person: object = { name: "Nhan", age: 22 };
  ```

## Type inference

- Type inference là khi chúng ta khai báo một biến, ts sẽ tự động đoán kiểu dữ liệu tùy thuộc vào giá trị dữ liệu mà chúng ta gán, do đó chúng ta sẽ không cần annotate kiểu dữ liệu.
- Chúng ta nên sử dụng type inference (không định dạng kiểu dữ liệu) khi chúng ta không xác định trước được biến mà chúng ta khai báo sẽ thuộc kiểu dữ gì (khi chúng ta code một function hoặc một array, object), lúc đó chúng ta sẽ để cho ts tự động định dạng kiểu dữ liệu. Còn trong trường hợp chúng ta xác định trước được biến đó thuộc dạng dữ liệu gì thì chúng ta sẽ sử dụng type annotation để ràng buộc kiểu dữ liệu, để trong tương lai biến đó sẽ không bị biến đổi nhầm sang kiểu dữ liệu khác.

  ```
  let numberVariable1 = 10;
  let stringVariable1 = "Hello World";
  let names1 = ["Phan", "Nguyen", "Thanh", "Nhan", 22]; // == let names1: (string | number)[] = ["Phan", "Nguyen", "Thanh", "Nhan", 22]

  console.log(typeof numberVariable1);
  console.log(typeof stringVariable1);
  console.log(typeof names1);
  ```

## Kiểu dữ liệu Object

```
let person1: object = { name: "Nhan", age: 22 };
let person2: { name: string; age: number } = { name: "Nhan", age: 22 };

interface Person {
  name: string;
  age: number;
}
let person3: Person = { name: "Nhan", age: 22 };
```

## Kiểu dữ liệu Array

- Thông thường khi chúng ta khai báo biến kiểu dữ liệu kiểu array, chúng ta phải xác định được kiểu dữ liệu của các phần tử có bên trong mảng để khai báo cho phù hợp.

  Mảng chỉ chứa string:

  ```
  let stringArray: string[] = ["Phan", "Nguyen", "Thanh", "Nhan"];
  ```

  Mảng chỉ chứa number:

  ```
  let numberArray: number[] = [1, 2, 3, 4, 5];
  ```

  Mảng chứa các dữ liệu mix:

  ```
  let mixArray: (string | number | object)[] = [
    "Thành Nhân",
    22,
    { height: 172, weight: 72 },
  ];
  ```

## Kiểu dữ liệu Tuple

- Kiểu dữ liệu Tuple sẽ tương tự như kiểu dữ liệu Array, tuy nhiên khác ở chỗ là Tuple cho phép chúng ta ràng buộc về số lượng phần tử có trong Tuple cũng như là thứ tự các giá trị trong Tuple.
- Giá sử chúng ta định nghĩa một Tuple có kích thước là 2 và thứ tự là phần tử đầu tiên có kiểu dữ liệu là string và phần tử thứ hai có kiểu dữ liệu là number.

  ```
  let tupple: [string, number] = ["Nhan", 21]; // [21, "Nhan"] => error
  let tupple1: [boolean, number, string] = [false, 21, "Nhan"];
  ```

- Trong Tuple chúng ta có thể set một phần tử là optional, tức là khi chúng ta gán giá trị thì phần tử đó có hay không đều
  được. Một điều lưu ý là chúng ta chỉ có thể set phần tử optional ở phần tử cuối cùng.

  ```
  let rgba: [number, number, number, number?];
  rgba = [255, 0, 255]; // Hoặc [255, 0, 255, 0.5]
  ```

## Kiểu dữ liệu enum

- Enum là kiểu dữ liệu dùng để nhóm các giá trị constant. Enum sẽ giúp chúng ta nhóm các giá trị constant có liên quan tới nhau nhằm cho code được tường minh hơn, đồng thời dễ dàng trong việc truy xuất các giá trị constant.
- Khi chúng ta khai báo kiểu dữ liệu enum, thì kết quả mà chúng ta nhận được là object chứa các phần tử constant mà chúng ta đã định nghĩa
- Cách sử dụng enum: enum name {constant1, constant2, ...};
- Khi chúng ta khai báo các phần tử trong enum mà không gán giá trị, thì mặc định TS sẽ gán giá trị cho các thành phần đó dựa trên index.

  ```
  enum Month {
    Jan,
    Feb,
    Mar,
    Apr,
    May,
    Jun,
    Jul,
    Aug,
    Sep,
    Oct,
    Nov,
    Dec,
  }
  console.log(Month);
  console.log(Month.Feb);
  ```

- Giả sử chúng ta cần khai báo một const là API_STATUS, thì chúng sẽ sử dụng enum để khai báo.

  ```
  enum API_STATUS {
    PENDING = "PENDING",
    FULFILLED = "FULFILLED",
    REJECT = "REJECT",
  }
  console.log(API_STATUS);
  let response = "FULFILLED";
  if (response == API_STATUS.FULFILLED) {
    console.log(200);
  }
  ```

## Kiểu dữ liệu any

- Khi chúng ta khai báo một biến với kiểu dữ liệu any thì sẽ tương tự như cách chúng ta khai một biến trong js.
- Biến đó sau khi khai báo sẽ mang tính "freedom", có thể dễ dàng thay đổi các kiểu dữ liệu khác nhau.

  ```
  let anyVariable: any = "Nhan";
  anyVariable = true;
  anyVariable = 24;
  ```

- Một điều lưu ý khi sử dụng any là khi chúng ta chỉ nên sử dụng khi chúng ta không xác định được kiểu dữ liệu của biến đó (tức là chúng ta xác định biến đó cần được thay đổi nhiều kiểu dữ liệu để xử lý các logic khác nhau).
- Trong một project, chúng ta cần phải hạn chế các kiểu dữ liệu any càng nhiều càng tốt, nếu không sẽ xảy ra những hạn chế tương tự như js.
- Một điều nữa là khi chúng ta khai báo biến với kiểu dữ liệu any, thì IDE sẽ không hỗ trợ gợi ý các method và property cho biến đó.

## Kiểu dữ liệu void

- Kiểu dữ liệu void thường được sử dụng trong function khi chúng ta không return một giá trị nào, tương tự như kiểu dữ liệu void trong c++.
- Khi chúng ta code một function mà không return về một giá trị nào thì ts sẽ tự hiểu và tự gán kiểu dữ liệu void cho function đó, tuy nhiên với việc sử dụng void khi code sẽ giúp cho code clear hơn, dễ dàng đọc và bảo trì code hơn.

```
const logHandler = (message: string): void => {
  console.log(message);
};
```

## Generics

```
const inserAtBeginning = <T>(array: T[], value: T) => {
  return [value, ...array]
}

const demoArray = [1, 2, 3];
const updatedArray = inserAtBeginning(demoArray, -1); // [-1, 1, 2, 3]

const stringArray = insertAtBeginning(['a', 'b', 'c'], 'd')
```

## Kiểu dữ liệu never (tà đạo - ít dùng)

- Kiểu dữ liệu never cũng tương tự như void, thường được sử dụng cho function không trả về kiểu dữ liệu nào.
- Thực tế với function được định nghĩa kiểu dữ liệu bằng void thì vẫn trả về dữ liệu là undefined, còn đối với never thực tế không trả về dữ liệu nào.
- Kiểu dữ liệu never thường được sử dụng cho function throw Error hoặc một function chứa vòng lặp vô hạn.

## Union Type

- Union Type cho phép chúng ta định dạng nhiều kiểu dữ liệu cho một biến.
- Chúng ta sẽ định dạng Union Type bằng dấu |.

  ```
  let unionVariable: string | number | object | boolean;
  ```

## Type Aliases và Interface

- Type Aliases cho phép chúng ta tự định nghĩa ra một kiểu dữ liệu mới theo mục đích của mình, sau đó chúng ta có thể khai báo biến dựa trên kiểu dữ liệu mà ta mới định nghĩa.
- Để định nghĩa một type aliases chúng ta sẽ sử dụng cú pháp: type aliasName = type

  ```
  type myType = number | string | object | boolean;
  type newStringType = string;
  let myVariable: myType = [1, 2, 4];
  let myString: newStringType = "Nhan Phan";
  ```

- Tương tự như Type Aliases, Interface cho phép chúng ta định nghĩa ra một cấu trúc dữ liệu mới theo mục đích của mình, tuy nhiên thường được dùng để định nghĩa một cấu trúc dữ liệu theo object.
- Interface mang ý nghĩa lập trình hướng đối tượng.
- Interface có keyword readonly được sử dụng để ngăn thay đổi giá trị của biến khi đã được gán giá trị.

  ```
  interface IPerson {
    readonly name: string;
    age: number;
  }

  const Nhan: IPerson = { name: "Nhan", age: 22 };
  console.log(Nhan);
  Nhan.name = "Thanh" // Error: Cannot assign to 'name' because it is a read-only property.
  ```

## If Else, Switch Case, For Loop, While Loop, Do While

- Tương tự như JavaScript.

## Function

- Tương tự như JavaScript, tuy nhiên chúng ta cần phải định dạng kiểu dữ liệu của các tham số truyền vào và kiểu dữ liệu của kết quả mà hàm trả về.
- Nếu không định dạng kiểu dữ liệu trả về của hàm thì ts sẽ tự đoán kiểu dữ liệu trả về cho hàm.

  ```
  function add(a: number, b: number) {
    return a + b;
  }
  console.log(add(6, 4));

  const greeting = function (a: string, b: string): string {
    return a.concat(b);
  };
  console.log(greeting("Hello", " Nhan"));

  const greeting2 = (a: string, b?: string): string => {
    // b là tham số optional
    if (b) {
      return a.concat(b);
    } else {
      return `${a}!`;
    }
  };
  console.log(greeting2("Hello"));
  console.log(greeting2("Hello", " Nhan"));

  const greeting3 = (a: string, b: string = "World"): string => {
    // b là tham số mặc định
    return a.concat(b);
  };
  console.log(greeting3("Hello"));
  console.log(greeting3("Hello", " Nhan"));

  const sum = (...numbers: number[]): number => {
    return numbers.reduce((total, number) => total + number, 0);
  };
  console.log(sum(1, 2));
  console.log(sum(1, 2, 3, 4));
  ```

## Function overloadings

- Function overloadings là cơ chế nạp chồng hàm, tức là cho phép chúng ta viết nhiều hàm tên giống nhau có cùng code xử lý nhưng khác nhau về tham số đầu vào.
- Giả sử chúng ta có 2 hàm cộng 2 số và nối 2 chuỗi, thì thay vì chúng phải viết 2 hàm riêng biệt là addNumbers và addStrings thì chúng ta có thể sử dụng function overloadings để gộp 2 hàm lại.

  ```
  const addNumbers = (a: number, b: number): number => a + b;
  const addStrings = (a: string, b: string): string => a + b;

  const addElements = (a: number | string, b: number | string) => {
    // Với cách viết này sẽ rất dài dòng vì chúng ta phải kiểm tra type của từng parameters
    if (typeof a === "number" && typeof b === "number") return a + b;

    if (typeof a === "string" && typeof b === "string") return a + b;
  };

  function addElementsViaOverloadings(a: number, b: number): number;
  function addElementsViaOverloadings(a: string, b: string): string;
  function addElementsViaOverloadings(a: any, b: any): any {
    return a + b;
  }
  ```

- Sử dụng overloadings để gộp 2 hàm có cùng chức năng nhưng khác tham số truyền vào. Một điều lưu ý khi sử dụng overloadings là các hàm với có cùng số lượng parameters truyền vào, nếu có một hàm có số lượng parameters lớn hơn thì phải set parameters dư ra thành optional parameters hoặc default parameters.

  ```
  class Counter {
    private current: number = 0;
    count(): number;
    count(target: number): number[];
    count(target?: number): number | number[] {
      if (target) {
        let values: number[] = [];
        for (let start = this.current; start <= target; start++) {
          values.push(start);
        }

        return values;
      }
      return ++this.current;
    }
  }
  let counter = new Counter();
  console.log(counter.count()); // return a number
  console.log(counter.count(20)); // return an array
  ```

## Classes

### Overview

- Tương tự như JS nhưng có thêm phần định dạng kiểu dữ liệu cho từng property.

  ```
  class Student {
    name: string;
    age: number;
    gender: string;

    constructor(name: string, age: number, gender: string) {
      this.name = name;
      this.age = age;
      this.gender = gender;
    }

    getFullName(): string {
      return this.name;
    }
  }
  const Nhan = new Student("Thanh Nhan", 22, "male");
  console.log(Nhan.getFullName());
  console.log(Nhan.age);
  console.log(Nhan.gender);
  ```

### Access Modifiers

- TypeScript hỗ trợ OOP mạnh mẽ hơn JavaScript bởi vì TS cung cấp các Access Modifiers (phạm vi sử dụng):

  - Public: tương tư như trong C/C++, khi khai báo các property hoặc các method mà không set gì thì mặc định là public. Các class object có thể truy cập được tất cả các property và method được set là public.
  - Private: tương tự như C/C++, các property và các method chỉ có thể truy cập bên trong class.
  - Protected: tương tự như C/C++, các property và các method có thể truy cập được bên trong class và các class con được kế thừa.

  ```
  class Student {
    private name: string;
    private age: number;
    private gender: string;

    constructor(name: string, age: number, gender: string) {
      this.name = name;
      this.age = age;
      this.gender = gender;
    }

    public getFullInfo(): string {
      return `Name: ${this.name}, Age: ${this.age}, Gender: ${this.gender}`;
    }
  }
  const Nhan = new Student("Thanh Nhan", 22, "male");
  console.log(Nhan.getFullInfo());
  console.log(Nhan.age); // Error: Property 'age' is private and only accessible within class 'Student1'.
  ```

- Ngoài việc khai báo các property ở bên ngoài, chúng có thể khai báo cũng như khởi tạo các property bên trong constructor bằng cách sử dụng các Access Modifiers.

  ```
  class Student {
    constructor(
      private name: string,
      private age: number,
      private gender: string
    ) {}

    public getFullInfo(): string {
      return `Name: ${this.name}, Age: ${this.age}, Gender: ${this.gender}`;
    }
  }
  const Nhan = new Student("Thanh Nhan", 22, "male");
  console.log(Nhan.getFullInfo());
  ```

### readonly

- Thuộc tính readonly tượng tự như thuộc tính const nhưng được sử dụng trong class.
- Một biến khi được khai báo với thuộc tính readonly thì sẽ không bị thay đổi khi được lần đầu khởi tạo.s

  ```
  class Student {
    readonly name: string;

    constructor(name: string) {
      this.name = name;
    }

    getName(): string {
      return this.name;
    }
  }
  const Nhan = new Student("Thanh Nhan");
  Nhan.name = "Phan" // Error: Cannot assign to 'name' because it is a read-only property.
  console.log(Nhan.getName());
  ```

### get, set

- get và set là 2 keyword được JavaScript cung cấp để sử dụng cho các hàm setter và getter để code tường minh, make sense.

  ```
  class Student {
    private _name: string;

    constructor(_name: string) {
      this._name = _name;
    }

    get name(): string {
      return this._name;
    }

    set name(newName: string) {
      this._name = newName;
    }
  }
  const Nhan = new Student("Thanh Nhan");
  console.log(Nhan.name);
  Nhan.name = "Nhan Thanh";
  console.log(Nhan.name);
  ```

### Inheritance

- Tương tự như JavaScript, một class con có thể kế thừa một class cha thông qua từ khóa extends, sử dụng từ khóa super nếu muốn gọi constructor, một property hoặc một method từ class cha.
- Một điều khác biệt là class con chỉ có thể truy cập các property và các method của class cha khi và chỉ khi được set với phạm vi public và protected.

  ```
  class Student {
    _name: string;
    protected _birthYear: number;

    constructor(_name: string, _birthYear: number) {
      this._name = _name;
      this._birthYear = _birthYear;
    }

    protected calcAge(): number {
      return 2023 - this._birthYear;
    }
  }

  class SubStudent extends Student {
    private _role: string;

    constructor(_name: string, _birthYear: number, _role: string) {
      super(_name, _birthYear);
      this._role = _role;
    }

    getFullInfo(): string {
      return `Name: ${this._name}, Age: ${super.calcAge()}, Role: ${this._role}`;
    }
  }
  let Nhan = new SubStudent("Nhan", 2001, "Class monitor");
  console.log(Nhan.getFullInfo());
  ```

- Ngoài việc sử dụng từ khóa extends để một class kế thừa từ một class khác, chúng ta có thể sử dụng từ khóa implements để một class kế thừa từ một interface (interface tương tự như một abstract class).

  ```
  interface IStudent {
    _name: string;
    getName(): string;
  }

  class Student implements IStudent {
    _name: string;

    constructor(_name: string) {
      this._name = _name;
    }

    getName(): string {
      return this._name;
    }
  }
  let Nhan = new Student("Nhan");
  console.log(Nhan.getName());
  ```

### override

- override là phương pháp chúng ta code lại một method trong class con với tên được đặt giống trong class cha.
- override được sử dụng khi method trong class con cần được ghi đè tùy theo mục đích sử dụng.
- Lưu ý chúng ta không sử dụng từ khóa override thì ts sẽ tự hiểu là chúng ta đang override lại method của hàm cha, từ khóa override được sử dụng với ý nghĩa là để thông báo lỗi khi method được override đó không có trong hàm cha.

```
class Student {
  _name: string;
  protected _age: number;

  constructor(_name: string, _age: number) {
    this._name = _name;
    this._age = _age;
  }

  protected getFullInfo(): string {
    return `Name: ${this._name}, Age: ${this._age}`;
  }
}

class SubStudent extends Student {
  private _role: string;

  constructor(_name: string, _birthYear: number, _role: string) {
    super(_name, _birthYear);
    this._role = _role;
  }

  override getFullInfo(): string {
    return `${super.getFullInfo()}, Role: ${this._role}`;
  }
}
let Nhan = new SubStudent("Nhan", 22, "Class monitor");
console.log(Nhan.getFullInfo());
```

### static

- Trong class, khi chúng ta khai báo một property hoặc một method với phạm vi static thì chúng ta có truy cập property và method đó từ bên ngoài mà không cần phải tạo mới object.
- Một điều lưu ý là một object được khởi tạo từ một class thì không thể nào truy cập được property và method được set phạm vi static, static chỉ có truy cập trực tiếp thông qua class.

  ```
  class Student {
    static _name: string = "Nhan";

    static greeting() {
      console.log("Hello");
    }
  }
  console.log(Student._name);
  console.log(Student.greeting());
  ```

### abstract

- Abstract class được sử dụng như một "bản thiết kế" - một bộ khung để cho các class khác kế thừa và tuân theo bộ khung đó.
- Abstract class không được sử dụng để tạo một object mới.
- Một điều lưu ý nếu trong abstract có khởi tạo các abstract method thì các class kế thừa bắt buộc phải định nghĩa (tức là thêm phần body) cho các method đó, còn các method không khởi tạo với abstract (normal method) thì các class kế thừa không cần định nghĩa và có thể sử dụng bình thường.
- Giả sử chúng ta có một class Employee trong đó có một method là getSalary và 2 class khác kế thừa là FulltimeEmployee và Contractor, tuy nhiên với mỗi class kế thừa khác nhau thì có cách tính lương khác nhau. Do đó trong trường hợp này chúng ta sẽ khởi tạo Employee là một abstract class và getSalary là một abstract method.

  ```
  abstract class Employee {
    constructor(private firstName: string, private lastName: string) {}

    //abstract method
    abstract getSalary(): number;

    //normal method
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }

    compensationStatement(): string {
      return `${this.fullName} makes ${this.getSalary()} a month.`;
    }
  }

  class FullTimeEmployee extends Employee {
    private rate: number = 2.5;

    constructor(firstName: string, lastName: string, private hours: number) {
      super(firstName, lastName);
    }

    getSalary(): number {
      return this.hours * this.rate;
    }
  }

  class Contractor extends Employee {
    private rate: number = 3;
    constructor(firstName: string, lastName: string, private hours: number) {
      super(firstName, lastName);
    }

    getSalary(): number {
      return this.hours * this.rate + 20;
    }
  }

  const employee1 = new FullTimeEmployee("Nhan", "Phan", 8);
  console.log(employee1.fullName);
  console.log(employee1.compensationStatement());

  const employee2 = new Contractor("Nhan", "Thanh", 8);
  console.log(employee2.fullName);
  console.log(employee2.compensationStatement());
  ```
