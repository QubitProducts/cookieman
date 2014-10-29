define(function (require) {

  var cookieman = require("../lib/cookieman");

  describe('cookieman', function () { 

    describe("cookies ", function () {

      describe("when page has no cookies", function () {

        it("should be an array", function () {
          expect(cookieman.cookies()).to.be.an('array');
        });

        it("should be an empty if there are no cookies", function () {
          expect(cookieman.cookies()).to.have.length(0);
        });

      });

      describe("when page has cookies", function () {

        beforeEach(function () {
          document.cookie = "foo=bar";
        });

        afterEach(function () {
          document.cookie = "foo=bar; expires=" + new Date(1).toUTCString();
          document.cookie = "blah; expires=" + new Date(1).toUTCString();
        });

        it("should map cookie values", function () {
          expect(cookieman.cookies()).to.have.length(1);
          expect(cookieman.cookies()).to.eql([{
            name: "foo",
            value: "bar"
          }]);
        });

        it("should handle cookies with no equals sign", function () {
          document.cookie = "blah";
          expect(cookieman.cookies()).to.have.length(2);
          expect(cookieman.cookies()[1]).to.eql({
            name: "blah",
            value: null
          });
        });

      });

    });

    describe("get", function () {

      beforeEach(function () {
        document.cookie = "sweety=darling;";
        document.cookie = "flippy=magoo; path=/cookie";
        document.cookie = "flippy=magoo1;";
      });

      afterEach(function () {
        document.cookie = "sweety=darling; expires=" + new Date(1).toUTCString();
        document.cookie = "flippy=magoo; expires=" + new Date(1).toUTCString();
        document.cookie = "flippy=magoo; path=/cookie; expires=" + new Date(1).toUTCString();
      });

      it("should return the cookies that match name", function () {
        expect(cookieman.get("flippy")).to.have.length(2);
        expect(cookieman.get("sweety")).to.have.length(1);
      });

    });

    describe("set", function () {

      afterEach(function () {
        document.cookie = "sweety=darling; expires=" + new Date(1).toUTCString();
        document.cookie = "flippy=magoo; expires=" + new Date(1).toUTCString();
        document.cookie = "flippy=magoo; path=/cookie; expires=" + new Date(1).toUTCString();
      });

      it("should set cookies", function () {
        expect(cookieman.get("flippy")).to.have.length(0);
        expect(cookieman.get("sweety")).to.have.length(0);

        cookieman.set("sweety", "darling");
        cookieman.set("flippy", "magoo");
        cookieman.set("flippy", "magoo", { path: "/cookie"});

        expect(cookieman.get("flippy")).to.have.length(2);
        expect(cookieman.get("sweety")).to.have.length(1);
      });

    });

    describe("clear", function () {

      afterEach(function () {
        document.cookie = "sweety=darling; expires=" + new Date(1).toUTCString();
        document.cookie = "flippy=magoo; expires=" + new Date(1).toUTCString();
        document.cookie = "flippy=magoo; path=/cookie; expires=" + new Date(1).toUTCString();
      });

      it("should clear cookies on the specified path and domain", function () {
        cookieman.set("sweety", "darling");
        expect(cookieman.get("sweety")).to.have.length(1);
        expect(cookieman.clear("sweety")).to.be(true);
        expect(cookieman.get("sweety")).to.have.length(0);
      });

      it("should return false if no cookie was cleard", function () {
        cookieman.set("flippy", "magoo", { path: "/cookie"});
        expect(cookieman.get("flippy")).to.have.length(1);
        expect(cookieman.clear("flippy")).to.be(false);
        expect(cookieman.get("flippy")).to.have.length(1);
        expect(cookieman.clear("flippy", { path: "/cookie"})).to.be(true);
        expect(cookieman.get("flippy")).to.have.length(0);
      });

    });


    describe("clearAll", function () {

      afterEach(function () {
        document.cookie = "sweety=darling; expires=" + new Date(1).toUTCString();
        document.cookie = "flippy=magoo; expires=" + new Date(1).toUTCString();
        document.cookie = "flippy=magoo; path=/cookie; expires=" + new Date(1).toUTCString();
      });

      it("should clear cookies no matter what path/domain they're on", function () {
        cookieman.set("flippy", "magoo", { path: "/cookie"});
        cookieman.clearAll("sweety");
        expect(cookieman.get("sweety")).to.have.length(0);
      });

      it("should return metadata about the path and domain of the cleard cookie", function () {
        var domain = window.location.hostname === "localhost" ? null : window.location.hostname;
        
        cookieman.set("flippy", "magoo", { path: "/cookie"});
        expect(cookieman.clearAll("flippy")).to.eql([{
          path: "/cookie",
          domain: domain
        }]);

        cookieman.set("flippy", "magoo");
        expect(cookieman.clearAll("flippy")).to.eql([{
          path: null,
          domain: null
        }]);

      });

    });

  });

});
