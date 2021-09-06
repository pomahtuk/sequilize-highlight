import highlightSQL from "./index";
import { sqlKeyWords, extractKeywords } from "./keywords";

describe("Highlighting syntax", () => {
  it("Can highlight keywords in any case", () => {
    for (const kv of sqlKeyWords) {
      const text = `example_some ${kv} other`;

      const highlighted = highlightSQL(text);

      expect(highlighted).not.toEqual(text);
      expect(highlighted).toMatchSnapshot();
    }
  });

  it("Can highlight numbers in SQL", () => {
    const strings = [
      "select * from Table limit 100",
      "delete from Table where id = 2387",
    ];

    for (const text of strings) {
      const highlighted = highlightSQL(text);

      expect(highlighted).not.toEqual(text);
      expect(highlighted).toMatchSnapshot();
    }
  });

  it("Can highlight string in SQL", () => {
    const strings = [
      "select * from Table where `example_column_name` = 'some_value'",
    ];

    for (const text of strings) {
      const highlighted = highlightSQL(text);

      expect(highlighted).not.toEqual(text);
      expect(highlighted).toMatchSnapshot();
    }
  });

  it("Can highlight function in SQL", () => {
    const strings = ["SELECT *, dbo.east_or_west(city.long) FROM city;"];

    for (const text of strings) {
      const highlighted = highlightSQL(text);

      expect(highlighted).not.toEqual(text);
      expect(highlighted).toMatchSnapshot();
    }
  });

  it("Can capitalize keywords while highlighting", () => {
    const text = "select * from Table limit 100";

    const highlighted = highlightSQL(text, {
      capitalizeKeywords: true,
    });

    console.log(highlighted);

    expect(highlighted).not.toEqual(text);
    expect(highlighted).toMatch("SELECT");
    expect(highlighted).toMatch("FROM");
    expect(highlighted).toMatchSnapshot();
  });

  it("Can extract keywords", () => {
    const text = "select * from Table limit 100";
    const kvs = extractKeywords(text);
    expect(kvs).toHaveLength(3);
  });
});
