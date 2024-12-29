---
layout: post
title: Nguyên tắc SOLID trong code - Bạn đã biết chưa? 🤔
subtitle: Nguyên tắc SOLID giúp bạn dễ dàng triển khai code hơn, dễ bảo trì hơn.
author: Dinh Truong
categories: code-tips
tags:
  - solid
  - code
  - tips
banner:
  image: ![](../assets/images/2024_12/SOLID-Principles.jpg)
---

# Nguyên tắc SOLID trong code - Bạn đã biết chưa? 🤔

Khi nhắc đến việc viết code "đẹp", không chỉ là về cú pháp gọn gàng hay biến tên dễ hiểu, mà đó còn là khả năng mở rộng, bảo trì, và tái sử dụng. Và trong hành trình trở thành một lập trình viên xịn sò, bạn có nghe đến nguyên tắc SOLID chưa? Nếu chưa, hãy cùng khám phá ngay nhé! 🔍

![](../assets/images/2024_12/SOLID-Principles.jpg)

## SOLID là gì? 🧱

SOLID là một tập hợp 5 nguyên tắc thiết kế phần mềm do Robert C. Martin ("Uncle Bob") đề xuất, giúp bạn:

- Viết code dễ bảo trì.
- Tránh việc sửa một lỗi mà lại gây ra lỗi khác.
- Dễ dàng thêm tính năng mới.

> **"Viết code mà ngay cả bạn trong tương lai cũng cảm ơn mình!"**

Vậy, SOLID gồm những gì?

## 1. S - Single Responsibility Principle (SRP) 🛠️

Mỗi lớp hoặc module chỉ nên có một lý do để thay đổi.

> Ví dụ thực tế như này: Hãy tưởng tượng bạn có một nhà hàng và một nhân viên vừa phải nấu ăn, vừa phải phục vụ khách hàng, vừa phải dọn dẹp. Quá tải, đúng không? Trong code, cũng vậy.

### Ví dụ trong Python:

**Không tuân thủ SRP:**

```
class DataProcessor:
    def process_data(self, data):
        print("Processing data...")

    def log(self, message):
        print(f"Log: {message}")
```

Lớp trên vừa xử lý dữ liệu vừa ghi log. Nếu bạn muốn thay đổi cách log, bạn sẽ phải sửa cả lớp này.

**Tuân thủ SRP:**

```
class DataProcessor:
    def process_data(self, data):
        print("Processing data...")

class Logger:
    def log(self, message):
        print(f"Log: {message}")
```

> Như việc thuê riêng đầu bếp và nhân viên dọn dẹp vậy. Mỗi người làm tốt phần việc của mình! 👌

## 2. O - Open/Closed Principle (OCP) 🚪

Lớp nên mở để mở rộng, nhưng đóng để sửa đổi.

> Ví dụ: Bạn muốn thêm món mới vào menu, nhưng không thể sửa công thức của các món cũ vì khách hàng yêu thích chúng. Hãy thêm món, đừng sửa món! 🍔

### Ví dụ trong Python:

**Không tuân thủ OCP:**

```
class AreaCalculator:
    def calculate_area(self, shape):
        if shape["type"] == "circle":
            return 3.14 * shape["radius"] ** 2
        elif shape["type"] == "rectangle":
            return shape["width"] * shape["height"]
```

Mỗi khi thêm một hình dạng mới, bạn phải sửa phương thức calculate_area.

**Tuân thủ OCP:**

```
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14 * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

shapes = [Circle(5), Rectangle(4, 6)]
total_area = sum(shape.area() for shape in shapes)
print(total_area)
```

> Dễ dàng thêm hình tam giác mà không làm ảnh hưởng đến hình tròn hay hình chữ nhật! 🛠️

## 3. L - Liskov Substitution Principle (LSP) 🦆

Lớp con phải thay thế được lớp cha mà không làm thay đổi tính đúng đắn của chương trình.

> Ví dụ thực tế: Một con vịt đồ chơi phải "giả" được hành vi của vịt thật, chẳng hạn bơi lội, nhưng không cần đẻ trứng! 🦆

### Ví dụ trong Python:**

**Không tuân thủ LSP:**

```
class Bird:
    def fly(self):
        print("Flying")

class Penguin(Bird):
    def fly(self):
        raise NotImplementedError("Penguins can't fly")
```

**Tuân thủ LSP:**

```
from abc import ABC, abstractmethod

class Bird(ABC):
    @abstractmethod
    def move(self):
        pass

class FlyingBird(Bird):
    def move(self):
        print("Flying")

class NonFlyingBird(Bird):
    def move(self):
        print("Walking")

birds = [FlyingBird(), NonFlyingBird()]
for bird in birds:
    bird.move()
```

> Lời khuyên: Đừng ép chim cánh cụt phải bay, hãy để chúng làm điều chúng giỏi nhất - đi bộ! 🚶‍♂️

## 4. I - Interface Segregation Principle (ISP) 🔌

Interface không nên ép các lớp phải thực thi các phương thức chúng không dùng.

>> Ví dụ thực tế: Đừng bắt cá voi phải chạy marathon, nó chỉ cần bơi là đủ! 🐋

### Ví dụ trong Python:

**Không tuân thủ ISP:**

```
class Animal:
    def fly(self):
        pass

    def swim(self):
        pass

    def walk(self):
        pass

class Dog(Animal):
    def fly(self):
        pass  # Không dùng

    def swim(self):
        print("Swimming")

    def walk(self):
        print("Walking")
```

**Tuân thủ ISP:**

```
class Walkable:
    def walk(self):
        pass

class Swimmable:
    def swim(self):
        pass

class Dog(Walkable, Swimmable):
    def walk(self):
        print("Walking")

    def swim(self):
        print("Swimming")
```

> Bình luận: Phân tách interface, và ai cần gì thì làm nấy! 👍

## 5. D - Dependency Inversion Principle (DIP) 🔄

Module cấp cao không nên phụ thuộc module cấp thấp, cả hai nên phụ thuộc abstraction.

> Ví dụ thực tế: Đừng để nhà hàng chỉ phục vụ được một loại đồ uống. Hãy linh hoạt để dễ dàng thay đổi! ☕🍹

### Ví dụ trong Python:

**Không tuân thủ DIP:**

```
class MySQLDatabase:
    def connect(self):
        print("Connecting to MySQL")

class Application:
    def __init__(self):
        self.database = MySQLDatabase()

    def run(self):
        self.database.connect()
```

**Tuân thủ DIP:**

```
from abc import ABC, abstractmethod

class Database(ABC):
    @abstractmethod
    def connect(self):
        pass

class MySQLDatabase(Database):
    def connect(self):
        print("Connecting to MySQL")

class PostgreSQLDatabase(Database):
    def connect(self):
        print("Connecting to PostgreSQL")

class Application:
    def __init__(self, database: Database):
        self.database = database

    def run(self):
        self.database.connect()

app = Application(MySQLDatabase())
app.run()

app = Application(PostgreSQLDatabase())
app.run()
```

> Bình luận: Mỗi loại cơ sở dữ liệu là một "đồ uống" riêng, và nhà hàng dễ dàng thay đổi theo yêu cầu khách hàng! 🥤

# Lời kết 📜

Nguyên tắc SOLID không chỉ là lý thuyết, mà là kim chỉ nam giúp bạn viết code dễ dàng mở rộng, bảo trì và tái sử dụng.

Hãy thử áp dụng ngay trong dự án tiếp theo của bạn và cảm nhận sự khác biệt. Đừng quên chia sẻ bài viết nếu bạn thấy hữu ích nhé! 🙌