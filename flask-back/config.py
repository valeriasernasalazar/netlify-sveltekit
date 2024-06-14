from configparser import ConfigParser

def config(filename='db.ini', section=""):
    parser = ConfigParser() # create parser
    parser.read(filename) # read config file
    db = {}
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            db[param[0]] = param[1]
    
    else:
        raise Exception('Section{0} is not found in the {1}'.format(section, filename))
    
    return db



