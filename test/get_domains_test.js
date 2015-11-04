var getDomains = require("../lib/get_domains");

describe("getDomains", function() {

  it("should return permutations of subdomains", function() {
    expect(getDomains("just.keep.coding.com")).to.contain("just.keep.coding.com");
    expect(getDomains("just.keep.coding.com")).to.contain("keep.coding.com");
    expect(getDomains("just.keep.coding.com")).to.contain("coding.com");
  });

  it("should return permutations of subdomains inc dot", function() {
    expect(getDomains("just.keep.coding.com")).to.contain(".just.keep.coding.com");
    expect(getDomains("just.keep.coding.com")).to.contain(".keep.coding.com");
    expect(getDomains("just.keep.coding.com")).to.contain(".coding.com");
  });

  it("should return a null value", function() {
    expect(getDomains("just.keep.coding.com")).to.contain(null);
  });

  it("should return nothing else", function() {
    expect(getDomains("just.keep.coding.com")).to.have.length(7);
  });

});
