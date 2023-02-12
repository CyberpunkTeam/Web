/*export const languages = ["Python", "Java", "JavaScript", "C++", "Go", "TypeScript", "PHP", "Ruby", "C", "C#", "Shell",
    "Nix", "HTML", "Scala", "Rust", "Kotlin", "Swift", "Jupyter Notebook", "Dart", "DM", "HCL", "Lua", "SystemVerilog",
    "CSS", "Perl", "Groovy", "Makefile", "Objective-C", "CodeQL", "SCSS", "Elixir", "OCaml", "Vue", "Haskell", "Starlark",
    "Lean", "Dockerfile", "Erlang", "Smarty", "Emacs Lisp", "Jinja", "PowerShell", "JSON", "Clojure", "Julia", "MLIR",
    "Verilog", "Vim Script", "Roff", "CoffeeScript", "Assembly", "WebAssembly", "Puppet", "F#", "R", "Jsonnet", "GAP",
    "Bicep", "MATLAB", "BitBake", "Visual Basic .NET", "PLpgSQL", "YAML", "ANTLR", "hoon", "Markdown", "TeX", "Fortran",
    "Twig", "Cython", "ZAP", "Cuda", "SourcePawn", "ColdFusion", "GLSL", "Sass", "Nunjucks", "XSLT", "Mustache",
    "Common Lisp", "SWIG", "Smalltalk", "Less", "Elm", "Gherkin", "Coq", "Vala", "CMake", "PostScript",
    "Haxe", "LLVM", "F*", "Stylus", "Crystal", "Raku", "Blade", "Batchfile", "Slim", "Handlebars", "Pascal"]*/

export const optionsLanguages = [
    {'value': 'Python', 'label': 'Python'},
    {'value': 'Java', 'label': 'Java'},
    {'value': 'JavaScript', 'label': 'JavaScript'},
    {'value': 'C++', 'label': 'C++'},
    {'value': 'Go', 'label': 'Go'},
    {'value': 'TypeScript', 'label': 'TypeScript'},
    {'value': 'PHP', 'label': 'PHP'},
    {'value': 'Ruby', 'label': 'Ruby'},
    {'value': 'C', 'label': 'C'},
    {'value': 'C#', 'label': 'C#'},
    {'value': 'Shell', 'label': 'Shell'},
    {'value': 'Nix', 'label': 'Nix'},
    {'value': 'HTML', 'label': 'HTML'},
    {'value': 'Scala', 'label': 'Scala'},
    {'value': 'Rust', 'label': 'Rust'},
    {'value': 'Kotlin', 'label': 'Kotlin'},
    {'value': 'Swift', 'label': 'Swift'},
    {'value': 'Jupyter Notebook', 'label': 'Jupyter Notebook'},
    {'value': 'Dart', 'label': 'Dart'}, {'value': 'DM', 'label': 'DM'},
    {'value': 'HCL', 'label': 'HCL'},
    {'value': 'Lua', 'label': 'Lua'},
    {'value': 'SystemVerilog', 'label': 'SystemVerilog'},
    {'value': 'CSS', 'label': 'CSS'},
    {'value': 'Perl', 'label': 'Perl'},
    {'value': 'Groovy', 'label': 'Groovy'},
    {'value': 'Makefile', 'label': 'Makefile'},
    {'value': 'Objective-C', 'label': 'Objective-C'},
    {'value': 'CodeQL', 'label': 'CodeQL'},
    {'value': 'SCSS', 'label': 'SCSS'},
    {'value': 'Elixir', 'label': 'Elixir'},
    {'value': 'OCaml', 'label': 'OCaml'},
    {'value': 'Vue', 'label': 'Vue'},
    {'value': 'Haskell', 'label': 'Haskell'},
    {'value': 'Starlark', 'label': 'Starlark'},
    {'value': 'Lean', 'label': 'Lean'},
    {'value': 'Dockerfile', 'label': 'Dockerfile'},
    {'value': 'Erlang', 'label': 'Erlang'},
    {'value': 'Smarty', 'label': 'Smarty'},
    {'value': 'Emacs Lisp', 'label': 'Emacs Lisp'},
    {'value': 'Jinja', 'label': 'Jinja'},
    {'value': 'PowerShell', 'label': 'PowerShell'},
    {'value': 'JSON', 'label': 'JSON'},
    {'value': 'Clojure', 'label': 'Clojure'},
    {'value': 'Julia', 'label': 'Julia'},
    {'value': 'MLIR', 'label': 'MLIR'},
    {'value': 'Verilog', 'label': 'Verilog'},
    {'value': 'Vim Script', 'label': 'Vim Script'},
    {'value': 'Roff', 'label': 'Roff'},
    {'value': 'CoffeeScript', 'label': 'CoffeeScript'},
    {'value': 'Assembly', 'label': 'Assembly'},
    {'value': 'WebAssembly', 'label': 'WebAssembly'},
    {'value': 'Puppet', 'label': 'Puppet'},
    {'value': 'F#', 'label': 'F#'},
    {'value': 'R', 'label': 'R'},
    {'value': 'Jsonnet', 'label': 'Jsonnet'},
    {'value': 'GAP', 'label': 'GAP'},
    {'value': 'Bicep', 'label': 'Bicep'},
    {'value': 'MATLAB', 'label': 'MATLAB'},
    {'value': 'BitBake', 'label': 'BitBake'},
    {'value': 'Visual Basic .NET', 'label': 'Visual Basic .NET'},
    {'value': 'PLpgSQL', 'label': 'PLpgSQL'},
    {'value': 'YAML', 'label': 'YAML'},
    {'value': 'ANTLR', 'label': 'ANTLR'},
    {'value': 'hoon', 'label': 'hoon'},
    {'value': 'Markdown', 'label': 'Markdown'},
    {'value': 'TeX', 'label': 'TeX'},
    {'value': 'Fortran', 'label': 'Fortran'},
    {'value': 'Twig', 'label': 'Twig'},
    {'value': 'Cython', 'label': 'Cython'},
    {'value': 'ZAP', 'label': 'ZAP'},
    {'value': 'Cuda', 'label': 'Cuda'},
    {'value': 'SourcePawn', 'label': 'SourcePawn'},
    {'value': 'ColdFusion', 'label': 'ColdFusion'},
    {'value': 'GLSL', 'label': 'GLSL'},
    {'value': 'Sass', 'label': 'Sass'},
    {'value': 'Nunjucks', 'label': 'Nunjucks'},
    {'value': 'XSLT', 'label': 'XSLT'},
    {'value': 'Mustache', 'label': 'Mustache'},
    {'value': 'Common Lisp', 'label': 'Common Lisp'},
    {'value': 'SWIG', 'label': 'SWIG'},
    {'value': 'Smalltalk', 'label': 'Smalltalk'},
    {'value': 'Less', 'label': 'Less'},
    {'value': 'Elm', 'label': 'Elm'},
    {'value': 'Gherkin', 'label': 'Gherkin'},
    {'value': 'Coq', 'label': 'Coq'},
    {'value': 'Vala', 'label': 'Vala'},
    {'value': 'CMake', 'label': 'CMake'},
    {'value': 'PostScript', 'label': 'PostScript'},
    {'value': 'Haxe', 'label': 'Haxe'},
    {'value': 'LLVM', 'label': 'LLVM'},
    {'value': 'F*', 'label': 'F*'},
    {'value': 'Stylus', 'label': 'Stylus'},
    {'value': 'Crystal', 'label': 'Crystal'},
    {'value': 'Raku', 'label': 'Raku'},
    {'value': 'Blade', 'label': 'Blade'},
    {'value': 'Batchfile', 'label': 'Batchfile'},
    {'value': 'Slim', 'label': 'Slim'},
    {'value': 'Handlebars', 'label': 'Handlebars'},
    {'value': 'Pascal', 'label': 'Pascal'}
]

export const optionsProjects = [
    {'value': 'Web', 'label': 'Web'},
    {'value': 'Mobile', 'label': 'Mobile'},
    {'value': 'Crypto', 'label': 'Crypto'},
    {'value': 'Backend', 'label': 'Backend'},
    {'value': 'Data Science', 'label': 'Data Science'},
    {'value': 'Data Analytics', 'label': 'Data Analytics'},
    {'value': ' Data Engineering', 'label': ' Data Engineering'}
]

export const optionsIdioms = [
    {'value': 'English', 'label': 'English'},
    {'value': 'Chinese', 'label': 'Chinese'},
    {'value': 'Spanish', 'label': 'Spanish'},
    {'value': 'French', 'label': 'French'},
    {'value': 'German', 'label': 'German'},
    {'value': 'Portuguese', 'label': 'Portuguese'}
]

/*const frameworks = {
    "Java": ["Spring"],
    "Python": ["Django", "Flask", "FastAPI"],
    "Ruby": ["Ruby on Rails"],
    "JavaScript": ["React JS", "Node JS", "Vue JS", "Express", "Ember JS", "Meteor JS", "Expo", "React Native"],
    "TypeScript": ["Next JS", "Angular"],
    "C#": ["ASP.NET"],
    "PHP": ["CakePHP", "Laravel"],
    "Go": ["Gin", "Beego", "Echo", "Fiber"],
    "Dart": ["Flutter"]
}*/

export const frameworksOptionsData = {
    "Java": [
        {'value': 'Spring', 'label': 'Spring'}
    ],
    "Python": [
        {'value': 'Django', 'label': 'Django'},
        {'value': 'Flask', 'label': 'Flask'},
        {'value': 'FastAPI', 'label': 'FastAPI'}
    ],
    "Ruby": [
        {'value': 'Ruby on Rails', 'label': 'Ruby on Rails'}
    ],
    "JavaScript": [
        {'value': 'React JS', 'label': 'React JS'},
        {'value': 'Node JS', 'label': 'Node JS'},
        {'value': 'Vue JS', 'label': 'Vue JS'},
        {'value': 'Express', 'label': 'Express'},
        {'value': 'Ember JS', 'label': 'Ember JS'},
        {'value': 'Meteor JS', 'label': 'Meteor JS'},
        {'value': 'Expo', 'label': 'Expo'},
        {'value': 'React Native', 'label': 'React Native'}
    ],
    "TypeScript": [
        {'value': 'Next JS', 'label': 'Next JS'},
        {'value': 'Angular', 'label': 'Angular'}
    ],
    "C#": [
        {'value': 'ASP.NET', 'label': 'ASP.NET'}
    ],
    "PHP": [
        {'value': 'CakePHP', 'label': 'CakePHP'},
        {'value': 'Laravel', 'label': 'Laravel'}
    ],
    "Go": [
        {'value': 'Gin', 'label': 'Gin'},
        {'value': 'Beego', 'label': 'Beego'},
        {'value': 'Echo', 'label': 'Echo'},
        {'value': 'Fiber', 'label': 'Fiber'}
    ],
    "Dart": [
        {'value': 'Flutter', 'label': 'Flutter'}
    ]
}

export const frameworksOptionsDataAll = [
    {'value': 'Spring', 'label': 'Spring'},
    {'value': 'Django', 'label': 'Django'},
    {'value': 'Flask', 'label': 'Flask'},
    {'value': 'FastAPI', 'label': 'FastAPI'},
    {'value': 'Ruby on Rails', 'label': 'Ruby on Rails'},
    {'value': 'React JS', 'label': 'React JS'},
    {'value': 'Node JS', 'label': 'Node JS'},
    {'value': 'Vue JS', 'label': 'Vue JS'},
    {'value': 'Express', 'label': 'Express'},
    {'value': 'Ember JS', 'label': 'Ember JS'},
    {'value': 'Meteor JS', 'label': 'Meteor JS'},
    {'value': 'Expo', 'label': 'Expo'},
    {'value': 'React Native', 'label': 'React Native'},
    {'value': 'Next JS', 'label': 'Next JS'},
    {'value': 'Angular', 'label': 'Angular'},
    {'value': 'ASP.NET', 'label': 'ASP.NET'},
    {'value': 'CakePHP', 'label': 'CakePHP'},
    {'value': 'Laravel', 'label': 'Laravel'},
    {'value': 'Gin', 'label': 'Gin'},
    {'value': 'Beego', 'label': 'Beego'},
    {'value': 'Echo', 'label': 'Echo'},
    {'value': 'Fiber', 'label': 'Fiber'},
    {'value': 'Flutter', 'label': 'Flutter'}
]

export const platformsOptions = [
    {'value': 'Wix', 'label': 'Wix'},
    {'value': 'Squarespace', 'label': 'Squarespace'},
    {'value': 'GoDaddy', 'label': 'GoDaddy'},
    {'value': 'Weebly', 'label': 'Weebly'},
    {'value': 'Zyro', 'label': 'Zyro'},
    {'value': 'WordPress', 'label': 'WordPress'},
    {'value': 'SITE123', 'label': 'SITE123'},
    {'value': 'Strikingly', 'label': 'Strikingly'},
    {'value': '1&1 IONOS 2', 'label': '1&1 IONOS 2'},
    {'value': 'Jimdo Creator', 'label': 'Jimdo Creator'}
]

export const CloudOptions = [
    {'value': 'AWS', 'label': 'AWS'},
    {'value': 'Microsoft Azure', 'label': 'Microsoft Azure'},
    {'value': 'GCP', 'label': 'GCP'},
    {'value': 'Alibaba Cloud', 'label': 'Alibaba Cloud'},
    {'value': 'Oracle Cloud', 'label': 'Oracle Cloud'},
    {'value': 'IBM Cloud', 'label': 'IBM Cloud'},
    {'value': 'Tencent Cloud', 'label': 'Tencent Cloud'},
    {'value': 'OVHcloud', 'label': 'OVHcloud'},
    {'value': 'DigitalOcean', 'label': 'DigitalOcean'},
    {'value': 'Linode', 'label': 'Linode'},
    {'value': 'Salesforce', 'label': 'Salesforce'},
    {'value': 'SAP', 'label': 'SAP'}
]

export const databasesOptions = [
    {'value': 'Oracle', 'label': 'Oracle'},
    {'value': 'MySQL', 'label': 'MySQL'},
    {'value': 'Microsoft SQL Server', 'label': 'Microsoft SQL Server'},
    {'value': 'PostgreSQL', 'label': 'PostgreSQL'},
    {'value': 'MongoDB', 'label': 'MongoDB'},
    {'value': 'Redis', 'label': 'Redis'},
    {'value': 'Elasticsearch', 'label': 'Elasticsearch'},
    {'value': 'SQLite', 'label': 'SQLite'},
    {'value': 'Cassandra', 'label': 'Cassandra'},
    {'value': 'Splunk', 'label': 'Splunk'},
    {'value': 'MariaDB', 'label': 'MariaDB'},
    {'value': 'Teradata', 'label': 'Teradata'},
    {'value': 'Hive', 'label': 'Hive'},
    {'value': 'Solr', 'label': 'Solr'},
    {'value': 'HBase', 'label': 'HBase'},
    {'value': 'Amazon DynamoDB', 'label': 'Amazon DynamoDB'},
    {'value': 'Neo4j', 'label': 'Neo4j'},
    {'value': 'Couchbase', 'label': 'Couchbase'},
    {'value': 'Memcached', 'label': 'Memcached'},
    {'value': 'Microsoft Azure SQL Database', 'label': 'Microsoft Azure SQL Database'}
]

export const MethodologiesOptions = [
    {'value': 'Agile', 'label': 'Agile'},
    {'value': 'Scrum', 'label': 'Scrum'},
    {'value': 'FDD', 'label': 'FDD'},
    {'value': 'Lean Development', 'label': 'Lean Development'},
    {'value': 'XP', 'label': 'XP'},
    {'value': 'Waterfall Model', 'label': 'Waterfall Model'},
    {'value': 'Prototype Model', 'label': 'Prototype Model'},
    {'value': 'RAD', 'label': 'RAD'},
    {'value': 'Dynamic Systems', 'label': 'Dynamic Systems'},
    {'value': 'Spiral Model', 'label': 'Spiral Model'},
    {'value': 'JAD', 'label': 'JAD'},
    {'value': 'Rational Unified Process', 'label': 'Rational Unified Process'},
    {'value': '"DevOps Methodology', 'label': '"DevOps Methodology'},
    {'value': 'Adaptive Software Development', 'label': 'Adaptive Software Development'},
    {'value': 'BDD', 'label': 'BDD'}
]

/*

"Prototype Model", "RAD", "Dynamic Systems Development Model", "Spiral Model", "JAD", "Rational Unified Process", "DevOps Methodology", "Adaptive Software Development", "BDD"]
*/
