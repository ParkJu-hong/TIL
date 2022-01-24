# 문제

### 제출 날짜가 "Oct 20 2020" 또는 "Oct 21 2020"이고 module이 "Databases - MongoDB"가 아닌 submissions 컬렉션의 모든 도큐먼트를 반환하는 가장 간결한 쿼리를 작성하시오.

```json
db.submissions.find(
	{ "$or" : [{"data" : "Oct 20 2020"},
							{"data": "Oct 20 2020"}],
		"sprint" : {"$ne" : ""Databases - MongoDB""}}).pretty()
```

### 회사의 설립연도보다 현재 임직원 수가 더 많은 회사의 수를 알고 싶을 때, 이에 적절한 쿼리를 작성하시오.

```json
==>> 내가 쓴 답
db.collection_name.find(
	{"$gt": [{"$회사의 설립연도"},{"$현재 임직원 수"}]}
).pretty();

==>> 정답
db.collection_name.find(
	{"$expr" : {"$gt": ["현재 임직원 수","회사의 설립연도"]}}).count();

==> 정답2
db.collection_name.find(
	{"$expr": {"$lt": ["회사의 설립연도", "현재 임직원 수"]}}).count();

```

### accommodations 컬렉션의 amenities 필드에서 "Free parking on premises", "Air conditioning","Wifi"를 포함하며 2개 이상의 침실이 있는 숙소를 찾는 쿼리를 고르세요.

```json
==>> 내가 쓴 답
db.accommodations.find(
	{"$expr" : {"amenities": ["Free parking on premises", "Air conditioning","Wifi"],
	"$gt": [2, "$필드"]}});

==>> 정답
db.accommodations.find(
  { "amenities":
     { "$all": [ "Free parking on premises", "Wifi", "Air conditioning" ] },
    "bedrooms": { "$gte":  2 } }).pretty()

// 배열의 순서와 상관업시 일치하는 것을 가져올때 쓰는 건 "$all이다.
```

### 다음 쿼리 중 모든 임직원에 대한 정보가 저장된 employees 배열 필드에서 2050명의 임직원이 있는 회사의 이름만 companies 컬렉션에서 반환하는 것을 작성하세요

```json
==>> 정답
db.companies.find({ "employees": { "$size": 2050 } },
                  { "name": 1, "_id": 0 })
```

### 다음 쿼리 중 amenities 배열의 첫번째 요소로 Internet을 가진 숙소의 이름과 주소를 accommodations 컬렉션에서 반환하는 것을 작성하세요

```json
==>> 정답
db.accommodations.find({ "amenities.0": "Internet" },
                           { "name": 1, "address": 1 }).pretty()
```
