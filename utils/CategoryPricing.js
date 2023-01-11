

const getCategoryPricing = (cat, user) =>{
    const categories = [
        'CARS FOR SALE', 
        'PERFORMANCE CARS',
        'MOTORBIKES',
        'WHEELS',
        'TYRES',
        'PARTS',
        'GARAGES',
        'PAINT/BODY SHOP',
        'WRAP SHOPS',
        'ACCESSORIES',
        'BATTERIES',
        'APPAREL'
    ]
    let a_case = categories.indexOf(cat)
    let x = new Promise((res, rej)=>{
        switch (a_case){
            case 0:
                res({p: user.catTkt >= 333.333333333, v: 1000, c: 'catTkt'})
            case 1:
                res({p: user.perfTkt >= 2000, v: 2000, c: 'perfTkt'})
            case 2:
                res({p: user.bikeTkt >= 1000, v: 1000, c: 'bikeTkt'})
            case 3:
                res({p: user.wheelTkt >= 333.333333333, v: 1000, c: 'wheelTkt'})
            case 4:
                res({p: user.tyreTkt >= 333.333333333, v: 1000, c: 'tyreTkt'})
            case 5:
                res({p: user.partsTkt >= 333.333333333, v: 1000, c: 'partsTkt'})
            case 6:
                res({p: user.garTkt >= 2000, v: 2000, c: 'garTkt'})
            case 7:
                res({p: user.paintTkt >= 2000, v: 2000, c: 'paintTkt'})
            case 8:
                res({p: user.wrapTkt >= 3000, v: 3000, c: 'wrapTkt'})
            case 9:
                res({p: user.accTkt >= 333.333333333, v: 1000, c: 'accTkt'})
            case 10:
                res({p: user.battTkt >= 333.333333333, v: 1000, c: 'battTkt'})
            case 11:
                res({p: true, v: 0})
        }
    })
    return x
}

module.exports = {getCategoryPricing}