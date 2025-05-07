import { Cli, Builtins } from 'clipanion';
import { ProofCmd } from './commands/proof-cmd';


const cli = new Cli({
  binaryLabel: 'tooling',
  binaryName: 'tooling',
  binaryVersion: '0.0.1',
});

cli.register(ProofCmd);
cli.register(Builtins.HelpCommand);
cli.register(Builtins.VersionCommand);

await cli.runExit(process.argv.slice(2), {});
