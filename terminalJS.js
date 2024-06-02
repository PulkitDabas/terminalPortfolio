const formatter = new Intl.ListFormat('en', {
    style: 'long',
    type: 'conjunction',
  });

const url = 'https://v2.jokeapi.dev/joke/Programming';

const directories = {
    academics: [
        '',
        '<white>ACADEMICS</white>',

        '* <a href="https://dtu.ac.in/">Delhi Technologicall University</a> <yellow>"Electrical Engineering"</yellow> 2021-2025  CGPA: 8.168',
        '* <a href="#">Rajkiya Pratibha Vikas Vidyalaya</a> Sector XI Rohini, Delhi <yellow>"Class X"</yellow> Percentage: 96%',
        '* <a href="#">Rajkiya Pratibha Vikas Vidyalaya</a> Sector XI Rohini, Delhi <yellow>"Class XII"</yellow> Percentage: 92.2%',
        ''
    ],
    projects: [
        '',
        '<white>PROJECTS</white>',
        '<a href="https://calc4basicjs.web.app/" target="_blank">Basic Calculator</a>',
        '<a href="https://mrpskanjhawala.web.app/" target="_blank">Basic School Website(Frontend)</a>',
        '<a href="http://mrpskanjhawala.rf.gd/">Another Website</a>',
        '<a href="#">Photos Storage</a>',
        '<a href="#">Chat Application</a>',
        ''
    ].flat(),
    skills: [
        '',
        '<white>languages</white>',

        [
            'JavaScript'
        ].map(lang => `* <yellow>${lang}</yellow>`),
        '',
        '<white>libraries</white>',
        [
            'React.js'
        ].map(lib => `* <green>${lib}</green>`),
        '',
        '<white>tools</white>',
        [
            'git',
            'GNU/Linux'
        ].map(lib => `* <blue>${lib}</blue>`),
        ''
    ].flat()
};


const root = '~';
let cwd = root;



function print_dirs() {
    term.echo(dirs.map(dir => {
        return `<blue class="directory">${dir}</blue>`;
    }).join('\n'));
}





const commands = {
    help() {
        term.echo(`List of available commands: ${help}`);
    },
    ls(dir = null) {
        if (dir) {
            if (dir.match(/^~\/?$/)) {
                // ls ~ or ls ~/
                print_dirs();
            } else if (dir.startsWith('~/')) {
                const path = dir.substring(2);
                const dirs = path.split('/');
                if (dirs.length > 1) {
                    this.error('Invalid directory');
                } else {
                    const dir = dirs[0];
                    this.echo(directories[dir].join('\n'));
                }
            } else if (cwd === root) {
                if (dir in directories) {
                    this.echo(directories[dir].join('\n'));
                } else {
                    this.error('Invalid directory');
                }
            } else if (dir === '..') {
                print_dirs();
            } else {
                this.error('Invalid directory');
            }
        } else if (cwd === root) {
            print_dirs();
        } else {
            const dir = cwd.substring(2);
            this.echo(directories[dir].join('\n'));
        }
    }, 
    echo(...args) {
        term.echo(args.join(' '));
    },
    cd(dir = null) {
        if (dir === null || (dir === '..' && cwd !== root)) {
            cwd = root;
        } else if (dir.startsWith('~/') && dir.includes(dir.substring(2))) {
            cwd = dir;
        } else if (dirs.includes(dir)) {
            cwd = root + '/' + dir;
        } else {
            this.error('Wrong directory');
        }
    },
    async joke() {
        const res = await fetch(url);
        const data = await res.json();
        (async () => {
            if (data.type == 'twopart') {
                const prompt = this.get_prompt();
                this.set_prompt('');
                await this.echo(`Q: ${data.setup}`, {
                    delay: 50,
                    typing: true
                });
                await this.echo(`A: ${data.delivery}`, {
                    delay: 50,
                    typing: true
                });
                // we restore the prompt
                this.set_prompt(prompt);
            } else if (data.type === 'single') {
                await this.echo(data.joke, {
                    delay: 50,
                    typing: true
                });
            }
        })();
    },
    pulkit(){

    },
    credits() {
        return [
            '',
            '<white>Used Libraries:</white>',
            '* <a href="https://terminal.jcubic.pl">jQuery Terminal</a>',
            '* <a href="https://github.com/patorjk/figlet.js/">Figlet.js</a>',
            '* <a href="https://github.com/jcubic/isomorphic-lolcat">Isomorphic Lolcat</a>',
            '* <a href="https://jokeapi.dev/">Joke API</a>',
            ''
        ].join('\n');
    }
};
const dirs = Object.keys(directories);
const command_list = ['clear'].concat(Object.keys(commands));
const help = formatter.format(command_list);



let user = 'shinchan Nohara';
const server = 'thisisfun';

function prompt() {
    return `<green>${user}@${server}</green>:<blue>${cwd}</blue>$ `;
}






const greetings = `

/$$$$$$$            /$$ /$$       /$$   /$$           /$$$$$$$            /$$                          
| $$__  $$          | $$| $$      |__/  | $$          | $$__  $$          | $$                          
| $$  \ $$ /$$   /$$| $$| $$   /$$ /$$ /$$$$$$        | $$  \ $$  /$$$$$$ | $$$$$$$   /$$$$$$   /$$$$$$$
| $$$$$$$/| $$  | $$| $$| $$  /$$/| $$|_  $$_/        | $$  | $$ |____  $$| $$__  $$ |____  $$ /$$_____/
| $$____/ | $$  | $$| $$| $$$$$$/ | $$  | $$          | $$  | $$  /$$$$$$$| $$  \ $$  /$$$$$$$|  $$$$$$ 
| $$      | $$  | $$| $$| $$_  $$ | $$  | $$ /$$      | $$  | $$ /$$__  $$| $$  | $$ /$$__  $$ \____  $$
| $$      |  $$$$$$/| $$| $$ \  $$| $$  |  $$$$/      | $$$$$$$/|  $$$$$$$| $$$$$$$/|  $$$$$$$ /$$$$$$$/
|__/       \______/ |__/|__/  \__/|__/   \___/        |_______/  \_______/|_______/  \_______/|_______/ 
                                                                                                        
                                                                                                        
                                                                                                        

Wants to greet you to devote your time to review my terminal based portfolio.`
const instructions = `Type HELP and Press enter to get the list of commands that can be used for this terminal.`

const font = "Big";

const term = $('#terminal').terminal(commands, {
    greetings: false,
    checkArity: false,
    exit: false,
    completion(string) {
        // in every function we can use `this` to reference term object
        const cmd = this.get_command();
        // we process the command to extract the command name
        // at the rest of the command (the arguments as one string)
        const { name, rest } = $.terminal.parse_command(cmd);
        if (['cd', 'ls'].includes(name)) {
            if (rest.startsWith('~/')) {
                return dirs.map(dir => `~/${dir}`);
            }
            if (cwd === root) {
                return dirs;
            }
        }
        return Object.keys(commands);
    },
    prompt
});

function ready() {
    term.echo(greetings);
    term.echo(``);
    term.echo(``);
    term.echo(instructions);
 }

figlet.defaults({ fontPath: 'https://unpkg.com/figlet/fonts/' });
figlet.preloadFonts([font], ready);

function render(text) {
    const cols = term.cols();
    return figlet.textSync(text, {
        font: font,
        width: cols,
        whitespaceBreak: true
    });
}





