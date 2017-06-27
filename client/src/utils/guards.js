import {isMobile} from './platform'

export function homeGuard(to, from, next) {
	if(isMobile())
        next('join');
    else 
        next('create')
}

export function requiredMobile(to,from,next) {
	
	if(!isMobile())
		next(from.path)
	else
		next();
	
} 

export function requiredWeb(to,from,next) {
	
	if(isMobile())
		next(from.path);
	else
		next();
} 