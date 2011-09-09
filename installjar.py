#!/usr/bin/python
import os
import re
import sys

class mvninstalljar:
    def main(self):
        filenames = os.listdir("./")

        str_pom = ""
        for filename in filenames:
            res = self.getName(filename)
            if res != 0 :
                if res[1] == None:
                    temp_str = "<dependency>\n<groupId>com.huawei.accounts</groupId>\n <artifactId>%s</artifactId>\n <version>1.0</version>\n</dependency>\n" % res[0] 
                    str_pom += temp_str
                    str_install = "mvn install:install-file -DgroupId=com.huawei.accounts -DartifactId=%s -Dversion=1.0 -Dpackaging=jar -Dfile=%s" % (res[0],filename)
                    os.popen(str_install)
                else:
                    temp_str = "<dependency>\n <groupId>com.huawei.accounts</groupId>\n <artifactId>%s</artifactId>\n <version>%s</version>\n</dependency>\n" % (res[0],res[1]) 
                    str_pom += temp_str
                    str_install = "mvn install:install-file -DgroupId=com.huawei.accounts -DartifactId=%s -Dversion=%s -Dpackaging=jar -Dfile=%s" % (res[0],res[1],filename)
                    os.popen(str_install)
            else:
                print "Error:%s" % filename
        return str_pom
    def getName(self,filename):
        p = re.compile(r"([\w|-]+?)(-(\d+(\.\d+)*))*.jar$")
        m = p.match(filename)
        if m:
            return m.group(1,3)
        else:
            return 0

if __name__ == "__main__":
    mvninstalljar = mvninstalljar()
    try:
        output = open("pom",'w')
        output.write(mvninstalljar.main())
    finally:
        output.close()

