import * as fs from 'fs';
import * as path from 'path';

export class JsonReader{
   static read<T>(fileName:string):T{

        let filepath=path.join(process.cwd(),'testdata',fileName);
        let rawData=fs.readFileSync(filepath,'utf-8');
        return JSON.parse(rawData) as T;


    }
}
