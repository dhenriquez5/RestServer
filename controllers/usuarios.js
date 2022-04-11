const {response,request}=require('express')

const getUsuario=(req=request, res=response) => {
    const query=req.query
    res.json({ok: true,msg:'Get Api-controller',query});
}


const postUsuario=(req, res=response) => {
    res.json({ok: true,msg:'post Api-controller',data:req.body});
}


const putUsuario=(req, res=response) => {
    const id=req.params.id
    res.json({ok: true,msg:'put Api-controller',id});
}

const deleteUsuario=(req, res=response) => {
    res.json({ok: true,msg:'delete Api-controller'});
}

const patchUsuario=(req, res=response) => {
    res.json({ok: true,msg:'patch Api-controller'});
}




module.exports={
    getUsuario,
    deleteUsuario,
    patchUsuario,
    postUsuario,
    putUsuario

}