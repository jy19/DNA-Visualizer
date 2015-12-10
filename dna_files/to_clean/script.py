#script to clean files from blast
import os

for fn in os.listdir(os.getcwd()):
    print fn
    if not fn.endswith(".txt"):
        continue
    # query keep all sbjct
    # sbjct keep all query
    # query is before v
    # get first thing
    first = fn.split('v')[0]
    second = fn.split('v')[1].split('.')[0]
    tmpfilename = '{0}alignv{1}tmp'.format(first, second)
    os.system("sed '/^Sbjct/ d' < {0} > {1}".format(fn, tmpfilename))
    tmpfilenameclean = tmpfilename + 'cleaned'
    # get rid of extra stuff in first thing
    os.system("sed 's/[^ACGT-]//g' < {0} > {1}".format(tmpfilename, tmpfilenameclean))
    finalname = '{0}alignv{1}'.format(first, second)
    os.system("tr -d '\n' < {0} > {1}".format(tmpfilenameclean, finalname))

    tmpfilename2 = '{0}alignv{1}tmp'.format(second, first)
    os.system("sed '/^Query/ d' < {0} > {1}".format(fn, tmpfilename2))
    tmpfilenameclean2 = tmpfilename + 'cleaned'
    # get rid of extra stuff in first thing
    os.system("sed 's/[^ACGT-]//g' < {0} > {1}".format(tmpfilename2, tmpfilenameclean2))
    finalname2 = '{0}alignv{1}'.format(second, first)
    os.system("tr -d '\n' < {0} > {1}".format(tmpfilenameclean2, finalname2))
    os.system("rm {0} {1} {2} {3}".format(tmpfilename, tmpfilename2, tmpfilenameclean, tmpfilenameclean2))
