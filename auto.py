#!/usr/bin/python

import unittest
import installjar

class RegTestCase(unittest.TestCase):
    def setUp(self):
        self.mvn = installjar.mvninstalljar()
    def tearDown(self):
        self.mvn = None
    def testGetName(self):
        str = "xwork-2.1.2.jar"
        print self.mvn.getName(str)
        str = "xwork.jar"
        print self.mvn.getName(str)
        str = "xwork2-2.1.jar"
        print self.mvn.getName(str)
        str = "xwork-hello-2.2.jar"
        print self.mvn.getName(str)
        str = "servlet-api-2.5.23.jar"
        print self.mvn.getName(str)
# test suite
def suite():
    suite = unittest.TestSuite()
    suite.addTest(RegTestCase("testGetName"))
    return suite
if  __name__ == "__main__":
        unittest.main(defaultTest = 'suite')
