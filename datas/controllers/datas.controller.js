const dataModel = require('../models/datas.model');
const crypto = require('crypto');
const fetch = require('node-fetch');

exports.insert = async (req, res) => {
    try{        
        dataModel.createdata(req.body)
            .then((result) => {
                res.status(201).send({id: result._id});
            }).catch((e)=>{
                res.status(403).send({message: 'bad request'});
            });    
    }catch(e){
        res.status(403).send({error: e.message});  
    }

};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    dataModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    dataModel.findById(req.params.dataId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.patchById = (req, res) => {
    dataModel.patchdata(req.params.dataId, req.body)
        .then((result) => {
            res.status(204).send({});
        });

};

exports.removeById = (req, res) => {
    dataModel.removeById(req.params.dataId)
        .then((result)=>{
            res.status(204).send({});
        });
};

exports.predict=async (req,res)=>{
    console.log('start Treatment')
    let dat=req.body.text;
    let result=[]
    let save=[]
    let tmp
    console.log(dat.length)
    for(let i=0;i<dat.length;i++){
        let link="https://mlpcfakenewsdetector.herokuapp.com/api/fakedetector"
                // let link="http://localhost:8081/api/fakedetector";
                e=dat[i];
               // console.log(e)
                await fetch(link,{    
                    method:"POST",
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                  },
                    body: JSON.stringify(
                      {'text':e})
                  })
                    .then((response) => {
                      return response.json();    
                    })
                    .then((responseJson) => {
                            console.log(responseJson);
                            var fake=responseJson['fake'];
                            var truth=responseJson['truth'];
                            var rep="";
                            if(fake==0 && truth==0){
                              rep="une erreur s'est produite"
                              result.push({result:rep})
                              tmp="unknow";  
                            }
                            else if (fake==1){
                              rep='Cette information est fake'
                              result.push({result:rep})
                              tmp="-1"
                            }  
                            else{
                              rep="Cette infomation est fiable"
                              result.push({result:rep})
                              tmp="1"
                            }
                            //console.log(rep)
                            save.push({text:e,label});                                  
                    })
                   .catch((err)=>{
                      //  console.log("error "+err.message)
                        result.push({error:err.message})
                    })
       
    }
   // console.log(save)
    for(let p in save){
        dataModel.createdata(p);
    }
    //console.log(result)
    res.send({result:result})
}